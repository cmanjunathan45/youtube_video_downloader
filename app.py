#!/usr/bin/env python3
"""
YouTube Video Downloader
A Flask web application for downloading YouTube videos and playlists
"""

import sys
import subprocess
import os

# Auto-install dependencies if missing
def check_and_install_requirements():
    """Check if required packages are installed and install if missing"""
    requirements_file = 'requirements.txt'
    
    if not os.path.exists(requirements_file):
        print("❌ requirements.txt not found!")
        return
    
    print("🔍 Checking dependencies...")
    
    try:
        # Read requirements
        with open(requirements_file, 'r') as f:
            requirements = [line.strip() for line in f if line.strip() and not line.startswith('#')]
        
        missing_packages = []
        
        # Check each package
        for req in requirements:
            package_name = req.split('==')[0].split('>=')[0].split('<=')[0].strip()
            try:
                __import__(package_name.replace('-', '_'))
            except ImportError:
                missing_packages.append(req)
        
        if missing_packages:
            print(f"📦 Installing {len(missing_packages)} missing package(s)...")
            for package in missing_packages:
                print(f"   Installing {package}...")
                subprocess.check_call([sys.executable, '-m', 'pip', 'install', package, '-q'])
            print("✅ All dependencies installed successfully!")
        else:
            print("✅ All dependencies already installed!")
            
    except Exception as e:
        print(f"⚠️  Warning: Could not auto-install dependencies: {e}")
        print("   Please run manually: pip install -r requirements.txt")

# Run dependency check
check_and_install_requirements()

# Now import Flask and other dependencies
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import yt_dlp
import re
from urllib.parse import urlparse, parse_qs
import threading
from functools import lru_cache

app = Flask(__name__)
CORS(app)

# Configuration
DOWNLOAD_FOLDER = 'downloads'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# Track active downloads for cancellation and completion status
active_downloads = {}  # {download_key: {'cancelled': bool}}
download_status = {}  # {download_key: {'status': 'downloading'|'complete'|'error', 'filename': str, 'data': dict}}

def validate_youtube_url(url):
    """Validate if the URL is a valid YouTube URL"""
    youtube_regex = r'(https?://)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)/'
    if re.match(youtube_regex, url):
        return True
    return False

def extract_video_info(url):
    """Extract video information using yt-dlp"""
    # Base options for metadata extraction
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'skip_download': True,
    }

    # Optional cookies support (handles some login / anti-bot barriers)
    # Priority: explicit env var path (YTDLP_COOKIES_FILE) > local cookies.txt
    cookies_file = os.getenv('YTDLP_COOKIES_FILE') or 'cookies.txt'
    if os.path.exists(cookies_file):
        ydl_opts['cookiefile'] = cookies_file
        print(f"🔐 Using cookies file for extraction: {cookies_file}")
    else:
        # Allow passing raw cookies string via env (YTDLP_COOKIES) if provided
        raw_cookies = os.getenv('YTDLP_COOKIES')
        if raw_cookies:
            # Write ephemeral cookies file
            tmp_cookie_path = os.path.join(DOWNLOAD_FOLDER, '_inline_cookies.txt')
            try:
                with open(tmp_cookie_path, 'w', encoding='utf-8') as cf:
                    cf.write(raw_cookies.strip() + '\n')
                ydl_opts['cookiefile'] = tmp_cookie_path
                print("🔐 Using inline cookies from environment variable")
            except Exception as ce:
                print(f"⚠️ Failed writing inline cookies: {ce}")
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            if 'entries' in info:
                # Playlist
                videos = []
                for entry in info['entries']:
                    if entry:
                        video_data = process_video_formats(entry)
                        videos.append(video_data)
                return {
                    'type': 'playlist',
                    'title': info.get('title', 'Playlist'),
                    'videos': videos
                }
            else:
                # Single video - reuse the same logic as process_video_formats
                video_data = process_video_formats(info)
                return {
                    'type': 'video',
                    'video': video_data
                }
    except yt_dlp.utils.DownloadError as e:
        raise Exception(f"Failed to extract video: {str(e)}")
    except Exception as e:
        raise Exception(f"Unexpected error: {str(e)}")

def process_video_formats(info):
    """Process video formats and extract quality options"""
    formats = info.get('formats', [])
    
    if not formats:
        return {
            'id': info.get('id', ''),
            'title': info.get('title', 'Unknown'),
            'thumbnail': info.get('thumbnail', ''),
            'duration': info.get('duration', 0),
            'formats': []
        }
    
    # Collect all unique video heights available
    available_heights = set()
    for fmt in formats:
        height = fmt.get('height')
        vcodec = fmt.get('vcodec', 'none')
        if height and vcodec != 'none':
            available_heights.add(height)
    
    print(f"Available heights: {sorted(available_heights, reverse=True)}")  # Debug
    
    # Create format list for each available height with estimated file sizes
    quality_list = []
    duration = info.get('duration', 0)  # in seconds
    
    for height in sorted(available_heights, reverse=True):
        # Find actual formats that match this height to get better size estimates
        matching_formats = [f for f in formats if f.get('height') == height and f.get('vcodec') != 'none']
        
        if not matching_formats:
            continue
            
        # Get the best video format at this height (highest bitrate)
        best_video_format = max(matching_formats, key=lambda x: x.get('tbr', 0) or x.get('vbr', 0) or 0)
        best_video_id = best_video_format.get('format_id')
        
        # Use explicit format ID + best audio for better quality guarantee
        # This is more reliable than format selectors
        format_selector = f'{best_video_id}+bestaudio/best'
        
        print(f"For {height}p: Using format {best_video_id} (bitrate: {best_video_format.get('tbr', 0)})")  # Debug
        
        # Estimate file size based on format bitrates or use average values
        estimated_size = 0
        if matching_formats and duration > 0:
            # Get video bitrate - prefer highest quality
            video_bitrate = 0
            for fmt in matching_formats:
                vbr = fmt.get('vbr') or fmt.get('tbr', 0)
                if vbr > video_bitrate:
                    video_bitrate = vbr
            
            # Get audio bitrate (assume ~128kbps if not found)
            audio_bitrate = 128
            audio_formats_temp = [f for f in formats if f.get('acodec') != 'none']
            if audio_formats_temp:
                best_audio_temp = max(audio_formats_temp, key=lambda x: x.get('abr') or 0)
                audio_bitrate = best_audio_temp.get('abr', 128)
            
            # Calculate estimated size: (video_bitrate + audio_bitrate) * duration / 8 / 1024
            total_bitrate = video_bitrate + audio_bitrate
            if total_bitrate > 0:
                estimated_size = int((total_bitrate * duration) / 8 * 1024)  # in bytes
        
        quality_list.append({
            'format_id': format_selector,
            'quality': f"{height}p",
            'ext': 'mp4',
            'filesize': estimated_size,
        })
    
    # Add best audio option
    audio_formats = [f for f in formats if f.get('acodec') != 'none' and f.get('vcodec') == 'none']
    if audio_formats:
        best_audio = max(audio_formats, key=lambda x: x.get('abr') or 0)
        audio_abr = int(best_audio.get('abr', 0))
        
        # Estimate audio file size
        audio_size = 0
        if audio_abr > 0 and duration > 0:
            audio_size = int((audio_abr * duration) / 8 * 1024)  # in bytes
        
        quality_list.append({
            'format_id': 'bestaudio',
            'quality': f"Audio Only ({audio_abr}kbps)" if audio_abr > 0 else "Audio Only",
            'ext': 'mp3',
            'filesize': audio_size,
        })
    
    print(f"Quality list: {[q['quality'] for q in quality_list]}")  # Debug
    
    # Check for available subtitles (excluding auto-generated)
    subtitles_info = info.get('subtitles', {})
    automatic_captions = info.get('automatic_captions', {})
    
    available_subtitles = []
    for lang, subs in subtitles_info.items():
        # Only include manual subtitles (not auto-generated)
        if lang not in automatic_captions or subtitles_info.get(lang) != automatic_captions.get(lang):
            lang_name = subs[0].get('name', lang) if subs else lang
            available_subtitles.append({
                'lang': lang,
                'name': lang_name
            })
    
    return {
        'id': info.get('id', ''),
        'title': info.get('title', 'Unknown'),
        'thumbnail': info.get('thumbnail', ''),
        'duration': info.get('duration', 0),
        'formats': quality_list,
        'subtitles': available_subtitles
    }

@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')

@app.route('/api/extract', methods=['POST'])
def extract():
    """API endpoint to extract video information"""
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        if not validate_youtube_url(url):
            return jsonify({'error': 'Invalid YouTube URL. Please provide a valid YouTube video or playlist link.'}), 400
        
        # Extract video information
        result = extract_video_info(url)
        return jsonify(result), 200
        
    except Exception as e:
        error_message = str(e)
        lowered = error_message.lower()
        # Authentication / anti-bot / human verification messages
        auth_phrases = [
            'sign in to confirm', 'not a bot', 'verify you', 'captcha',
            'consent required', 'please sign in', 'account issue'
        ]
        if any(p in lowered for p in auth_phrases):
            return jsonify({
                'error': 'Authentication or human verification required for this video.',
                'code': 'auth_required',
                'video_id': request.get_json().get('url', ''),
                'suggestions': [
                    'Open the video in a browser account and verify accessibility.',
                    'Provide a cookies.txt file exported from your logged-in browser (set YTDLP_COOKIES_FILE).',
                    'Or run: yt-dlp --cookies-from-browser chrome <VIDEO_URL> --write-cookies cookies.txt',
                    'Retry after some time – temporary verification barriers may clear.'
                ]
            }), 403
        if 'Private video' in error_message or 'unavailable' in error_message:
            return jsonify({'error': 'Video is private or unavailable'}), 404
        elif 'age' in error_message.lower():
            return jsonify({'error': 'Age-restricted videos are not supported'}), 403
        else:
            return jsonify({'error': f'Failed to extract video: {error_message}'}), 500

@app.route('/api/download', methods=['POST'])
def download():
    """Download video on server and send to client"""
    try:
        import unicodedata
        import hashlib
        import uuid
        import time
        
        data = request.get_json()
        video_id = data.get('video_id', '')
        format_id = data.get('format_id', '')
        title = data.get('title', 'video')
        
        if not video_id or not format_id:
            return jsonify({'error': 'Video ID and format ID are required'}), 400
        
        # Create unique download ID to prevent concurrent request conflicts
        download_id = str(uuid.uuid4())[:8]
        timestamp = str(int(time.time() * 1000))[-6:]  # Last 6 digits of millisecond timestamp
        
        # Create a short hash of the title for filename uniqueness
        title_hash = hashlib.md5(title.encode()).hexdigest()[:8]
        
        # Use video_id + timestamp + download_id for unique filenames
        ascii_safe_title = f"video_{video_id}_{timestamp}_{download_id}"
        
        # Construct YouTube URL
        url = f"https://www.youtube.com/watch?v={video_id}"
        
        # Determine if audio only - check if format_id is ONLY audio (not video+audio)
        is_audio = (
            format_id == 'bestaudio' or  # Exact match for audio-only
            (format_id in ['251', '250', '249', '140', '139', '171'])  # Known audio format IDs
        )
        # Video formats will have 'bestvideo' or height specification like 'bestvideo[height=1080]+bestaudio'
        
        print(f"Format ID: {format_id}, Is Audio: {is_audio}")
        
        # Mark download as active with unique download_id
        download_key = f"{video_id}_{download_id}"
        active_downloads[download_key] = {'cancelled': False}
        
        # Use ASCII-safe filename for output to avoid encoding issues
        output_template = os.path.join(DOWNLOAD_FOLDER, f"{ascii_safe_title}.%(ext)s")
        
        print(f"Download request - Video ID: {video_id}, Format: {format_id}")
        print(f"Output template: {output_template}")
        
        # Check if FFmpeg is available
        import shutil
        ffmpeg_available = shutil.which('ffmpeg') is not None
        
        # Initialize warning message
        warning_msg = None
        
        # Progress hook to check for cancellation
        def progress_hook(d):
            if active_downloads.get(download_key, {}).get('cancelled', False):
                raise Exception('Download cancelled by user')
        
        # Configure yt-dlp to download the file with optimizations
        ydl_opts = {
            'format': format_id,
            'outtmpl': output_template,
            'quiet': False,
            'no_warnings': False,
            'progress_hooks': [progress_hook],  # Add cancellation check
            # Performance optimizations
            'concurrent_fragment_downloads': 5,  # Download 5 fragments concurrently for speed
            'retries': 10,
            'fragment_retries': 10,
            'skip_unavailable_fragments': True,  # Skip problematic fragments instead of failing
            'ignoreerrors': False,
            # SSL/TLS fixes
            'nocheckcertificate': True,  # Skip SSL certificate verification (fixes TLS errors)
            'prefer_insecure': False,
            # Subtitle options - only manual subtitles, not auto-generated
            'writesubtitles': True,
            'writeautomaticsub': False,  # Exclude auto-generated subtitles
            'subtitleslangs': ['all', '-live_chat'],  # Download all available manual subtitles but exclude live chat
            'subtitlesformat': 'srt',  # SRT format (most compatible)
            # Explicitly disable live chat
            'live_from_start': False,
            'wait_for_video': False,
            # Exclude live chat and other metadata files
            'skip_download': False,
            'extract_flat': False,
            'postprocessor_args': [],
        }
        
        # Video format handling
        if not is_audio:
            if ffmpeg_available:
                # With FFmpeg: Download best video+audio and merge to MP4
                # Print what format we're actually using
                print(f"Original format_id: {format_id}")
                
                # If format_id already contains +bestaudio or similar, use it as-is
                if '+' in format_id or '/' in format_id:
                    ydl_opts['format'] = format_id
                    print(f"Using format as-is: {format_id}")
                else:
                    # Otherwise append +bestaudio
                    ydl_opts['format'] = f'{format_id}+bestaudio/best'
                    print(f"Appending audio: {ydl_opts['format']}")
                
                ydl_opts['merge_output_format'] = 'mp4'
                ydl_opts['postprocessors'] = [{
                    'key': 'FFmpegVideoRemuxer',
                    'preferedformat': 'mp4',
                }]
                print("FFmpeg detected - will download video+audio and merge to MP4")
            else:
                # Without FFmpeg: Download pre-merged MP4 format
                ydl_opts['format'] = 'best[ext=mp4]/best'
                warning_msg = "FFmpeg not detected. Using pre-merged format which may have lower quality."
                print("FFmpeg not found - downloading pre-merged MP4 format")
        else:
            # Audio format handling - convert to MP3
            # Don't download subtitles for audio-only
            ydl_opts['writesubtitles'] = False
            ydl_opts['format'] = 'bestaudio/best'
            if ffmpeg_available:
                ydl_opts['postprocessors'] = [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }]
                print("FFmpeg detected - will extract and convert audio to MP3")
            else:
                warning_msg = "FFmpeg not detected. Audio format may vary."
                print("FFmpeg not found - downloading best audio format available")
        
        try:
            # Download the video
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                print(f"Starting download with format: {ydl_opts['format']}")
                print(f"Full ydl_opts: {ydl_opts}")
                
                # Extract info first to see what format will actually be selected
                info = ydl.extract_info(url, download=False)
                if 'requested_formats' in info:
                    print(f"Will download formats: {[f.get('format_id') for f in info['requested_formats']]}")
                elif 'format_id' in info:
                    print(f"Will download format: {info.get('format_id')}")
                
                result = ydl.download([url])
            
            # Immediately clean up unwanted files before finding the main file
            import glob
            ascii_pattern = ascii_safe_title.replace('[', '?').replace(']', '?')
            unwanted_patterns = [
                f"{ascii_pattern}*.live_chat.json",
                f"{ascii_pattern}*.description",
                f"{ascii_pattern}*.info.json"
            ]
            for pattern in unwanted_patterns:
                unwanted_files = glob.glob(os.path.join(DOWNLOAD_FOLDER, pattern))
                for unwanted_file in unwanted_files:
                    try:
                        os.remove(unwanted_file)
                        print(f"Removed unwanted file: {os.path.basename(unwanted_file)}")
                    except Exception as e:
                        print(f"Could not remove {unwanted_file}: {e}")
            
            # Wait a moment for file operations to complete
            import time
            time.sleep(0.5)
            
            # Find the downloaded file using ASCII-safe pattern
            matching_files = glob.glob(os.path.join(DOWNLOAD_FOLDER, f"{ascii_pattern}.*"))
            
            # Exclude .part files, .live_chat.json, .description, .info.json, and subtitle files
            excluded_extensions = ['.part', '.live_chat.json', '.description', '.info.json', '.srt', '.vtt']
            matching_files = [
                f for f in matching_files 
                if not any(f.endswith(ext) for ext in excluded_extensions)
            ]
            
            if not matching_files:
                # Try waiting a bit longer for file to be released
                time.sleep(1.5)
                matching_files = glob.glob(os.path.join(DOWNLOAD_FOLDER, f"{ascii_pattern}.*"))
                matching_files = [
                    f for f in matching_files 
                    if not any(f.endswith(ext) for ext in excluded_extensions)
                ]
                
            if not matching_files:
                return jsonify({'error': 'Download completed but file not found'}), 500
            
            # Get the most recently created file
            output_path = max(matching_files, key=os.path.getctime)
            filename = os.path.basename(output_path)
            
            # Try to get file size with retries (in case file is still locked)
            file_size = 0
            for attempt in range(5):
                try:
                    file_size = os.path.getsize(output_path)
                    break
                except (OSError, PermissionError) as e:
                    if attempt < 4:
                        time.sleep(0.5)
                    else:
                        print(f"Warning: Could not get file size after 5 attempts: {e}")
                        file_size = 0
            
            print(f"Download complete - File: {filename}, Size: {file_size} bytes")
            
            # Find subtitle files (if any were downloaded)
            subtitle_files = []
            if not is_audio:  # Only check for subtitles if it's a video
                subtitle_pattern = ascii_pattern + "*.srt"
                subtitle_matches = glob.glob(os.path.join(DOWNLOAD_FOLDER, subtitle_pattern))
                for sub_path in subtitle_matches:
                    sub_filename = os.path.basename(sub_path)
                    subtitle_files.append(sub_filename)
                    print(f"Found subtitle: {sub_filename}")
            
            # Return success with file info and original title for proper naming
            response_data = {
                'success': True,
                'filename': filename,
                'original_title': title,  # Send original title back to frontend
                'filesize': file_size,
                'subtitles': subtitle_files,
                'message': 'Download complete',
                'warning': warning_msg,
                'download_id': download_id  # Send download_id for cancellation
            }
            
            # Store completion status for mobile app switching recovery
            download_status[download_key] = {
                'status': 'complete',
                'data': response_data
            }
            
            # Clean up active downloads tracking
            if download_key in active_downloads:
                del active_downloads[download_key]
            
            return jsonify(response_data), 200
                        
        except Exception as e:
            error_msg = str(e)
            
            # Check if download was cancelled by user
            if 'cancelled by user' in error_msg.lower():
                print(f"Download cancelled by user for video: {video_id}")
                
                # Force garbage collection to release file handles
                import gc
                import time
                gc.collect()
                time.sleep(0.2)  # Give OS time to release handles
                
                # Clean up partial files with retry logic for locked files
                import glob
                ascii_pattern = ascii_safe_title.replace('[', '?').replace(']', '?')
                cleanup_patterns = [
                    f"{ascii_pattern}*.part*",  # All .part files and fragments
                    f"{ascii_pattern}*.ytdl",   # YTDL control files
                    f"{ascii_pattern}*.temp",   # Temp files
                ]
                
                cleaned_files = []
                failed_files = []
                
                for pattern in cleanup_patterns:
                    partial_files = glob.glob(os.path.join(DOWNLOAD_FOLDER, pattern))
                    for partial_file in partial_files:
                        # Retry deletion with increasing delays
                        deleted = False
                        for retry in range(5):
                            try:
                                os.remove(partial_file)
                                cleaned_files.append(os.path.basename(partial_file))
                                print(f"✓ Cleaned up: {os.path.basename(partial_file)}")
                                deleted = True
                                break
                            except (OSError, PermissionError) as cleanup_error:
                                if retry < 4:
                                    time.sleep(0.3 * (retry + 1))  # 0.3s, 0.6s, 0.9s, 1.2s, 1.5s
                                    gc.collect()
                                else:
                                    failed_files.append(os.path.basename(partial_file))
                                    print(f"Could not remove {partial_file} after 5 attempts: {cleanup_error}")
                        
                # Clean up active downloads tracking
                if download_key in active_downloads:
                    del active_downloads[download_key]
                
                response_data = {
                    'cancelled': True,
                    'message': 'Download cancelled by user',
                    'cleaned_files': cleaned_files
                }
                
                # Add warning if some files couldn't be deleted
                if failed_files:
                    response_data['warning'] = f"{len(failed_files)} file(s) will be cleaned up shortly"
                    response_data['failed_cleanup'] = failed_files
                    
                    # Schedule delayed cleanup for locked files in background thread
                    def delayed_cleanup():
                        import time
                        import gc
                        time.sleep(3)  # Wait 3 seconds
                        gc.collect()
                        
                        for failed_file in failed_files:
                            file_path = os.path.join(DOWNLOAD_FOLDER, failed_file)
                            if os.path.exists(file_path):
                                for retry in range(3):
                                    try:
                                        os.remove(file_path)
                                        print(f"✓ Delayed cleanup successful: {failed_file}")
                                        break
                                    except Exception as e:
                                        if retry < 2:
                                            time.sleep(1)
                                        else:
                                            print(f"⚠ Could not cleanup {failed_file} even after delay")
                    
                    # Run cleanup in background thread
                    import threading
                    cleanup_thread = threading.Thread(target=delayed_cleanup, daemon=True)
                    cleanup_thread.start()
                
                return jsonify(response_data), 200  # Return 200, not 500
            
            # Not a cancellation, handle as regular error
            print(f"yt-dlp error: {error_msg}")
            
            # Store error status for mobile recovery
            if 'download_key' in locals():
                download_status[download_key] = {
                    'status': 'error',
                    'error': error_msg
                }
            
            # Clean up active downloads tracking
            if download_key in active_downloads:
                del active_downloads[download_key]
            
            raise  # Re-raise to be caught by outer exception handler
                
        except yt_dlp.utils.DownloadError as e:
            error_msg = str(e)
            print(f"yt-dlp error: {error_msg}")
            
            # Clean up active downloads tracking
            if download_key in active_downloads:
                del active_downloads[download_key]
            
            if 'ffmpeg' in error_msg.lower():
                return jsonify({
                    'error': 'FFmpeg is required for this quality. Please install FFmpeg or choose a lower quality.',
                    'ffmpeg_required': True
                }), 500
            
            return jsonify({'error': f'Download failed: {error_msg}'}), 500
                
    except Exception as e:
        print(f"Download error: {str(e)}")
        import traceback
        traceback.print_exc()
        
        # Clean up active downloads tracking
        if 'download_key' in locals() and download_key in active_downloads:
            del active_downloads[download_key]
        
        return jsonify({'error': f'Download failed: {str(e)}'}), 500

@app.route('/api/get-file/<filename>')
def get_file(filename):
    """Serve downloaded file with streaming for large files"""
    try:
        from flask import send_file, Response
        import time
        
        file_path = os.path.join(DOWNLOAD_FOLDER, filename)
        
        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404
        
        # Wait a moment to ensure file is not locked
        time.sleep(0.5)
        
        # Get file size
        file_size = os.path.getsize(file_path)
        
        # Try to open file with retries (Windows file locking issue)
        for attempt in range(5):
            try:
                # Create ASCII-safe filename for Content-Disposition header
                # Use RFC 5987 encoding for non-ASCII filenames
                try:
                    filename_ascii = filename.encode('ascii')
                    content_disposition = f'attachment; filename="{filename}"'
                except UnicodeEncodeError:
                    # For non-ASCII filenames, use RFC 5987 encoding
                    import urllib.parse
                    encoded_filename = urllib.parse.quote(filename)
                    content_disposition = f"attachment; filename*=UTF-8''{encoded_filename}"
                
                # Use streaming for large files (>50MB)
                if file_size > 50 * 1024 * 1024:
                    def generate():
                        try:
                            with open(file_path, 'rb') as f:
                                chunk_size = 64 * 1024  # 64KB chunks for reliability (balanced speed/stability)
                                while True:
                                    chunk = f.read(chunk_size)
                                    if not chunk:
                                        break
                                    yield chunk
                        except Exception as e:
                            print(f"Error during file streaming: {e}")
                            raise
                    
                    return Response(
                        generate(),
                        mimetype='application/octet-stream',
                        headers={
                            'Content-Disposition': content_disposition,
                            'Content-Length': str(file_size),
                            'Cache-Control': 'no-cache',
                            'Connection': 'keep-alive',
                            'X-Accel-Buffering': 'no'  # Disable proxy buffering
                        }
                    )
                else:
                    # Use send_file for smaller files
                    return send_file(
                        file_path,
                        as_attachment=True,
                        download_name=filename
                    )
            except (OSError, PermissionError) as lock_error:
                if attempt < 4:
                    print(f"File locked, retry {attempt + 1}/5...")
                    time.sleep(0.5)
                else:
                    raise lock_error
                    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cleanup/<filename>', methods=['DELETE'])
def cleanup_file(filename):
    """Delete file after user has downloaded it"""
    import time
    import gc
    
    try:
        file_path = os.path.join(DOWNLOAD_FOLDER, filename)
        
        if not os.path.exists(file_path):
            return jsonify({'success': False, 'message': 'File not found'}), 404
        
        # Force garbage collection to release any file handles
        gc.collect()
        
        # Retry deletion with increasing delays (Windows file locking)
        for attempt in range(10):
            try:
                os.remove(file_path)
                print(f"✓ Deleted file: {filename}")
                return jsonify({'success': True, 'message': 'File deleted'}), 200
            except (OSError, PermissionError) as lock_error:
                if attempt < 9:
                    wait_time = 0.5 * (attempt + 1)  # Increasing wait: 0.5s, 1s, 1.5s, etc.
                    print(f"File locked, retry {attempt + 1}/10 (waiting {wait_time}s)...")
                    time.sleep(wait_time)
                    gc.collect()  # Try garbage collection again
                else:
                    # After 10 attempts, just log and return success anyway
                    # File will be cleaned up eventually or on next download
                    print(f"Warning: Could not delete {filename} after 10 attempts. Will clean up later.")
                    return jsonify({
                        'success': True, 
                        'message': 'Download complete. File cleanup pending.',
                        'warning': 'File will be cleaned up automatically'
                    }), 200
            
    except Exception as e:
        print(f"Error deleting file {filename}: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/cancel-download/<video_id>/<download_id>', methods=['POST'])
def cancel_download(video_id, download_id):
    """Mark a download as cancelled"""
    try:
        download_key = f"{video_id}_{download_id}"
        if download_key in active_downloads:
            active_downloads[download_key]['cancelled'] = True
            print(f"✓ Download cancelled for: {download_key}")
            return jsonify({'success': True, 'message': 'Download cancellation requested'}), 200
        else:
            # Try legacy key format for backwards compatibility
            if video_id in active_downloads:
                active_downloads[video_id]['cancelled'] = True
                print(f"✓ Download cancelled for video: {video_id}")
                return jsonify({'success': True, 'message': 'Download cancellation requested'}), 200
            return jsonify({'success': False, 'message': 'Download not found or already completed'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download-status/<video_id>/<download_id>', methods=['GET'])
def get_download_status(video_id, download_id):
    """Check download completion status - allows resuming after app switch on mobile"""
    try:
        download_key = f"{video_id}_{download_id}"
        
        # Check if download is complete
        if download_key in download_status:
            status_info = download_status[download_key]
            
            if status_info['status'] == 'complete':
                # Return the complete download data
                return jsonify({
                    'status': 'complete',
                    'data': status_info['data']
                }), 200
            elif status_info['status'] == 'error':
                return jsonify({
                    'status': 'error',
                    'error': status_info.get('error', 'Download failed')
                }), 500
            else:
                # Still downloading
                return jsonify({
                    'status': 'downloading',
                    'message': 'Download in progress'
                }), 200
        
        # Check if download is cancelled
        if download_key in active_downloads and active_downloads[download_key].get('cancelled'):
            return jsonify({
                'status': 'cancelled',
                'message': 'Download was cancelled'
            }), 200
        
        # Download not found
        return jsonify({
            'status': 'not_found',
            'message': 'Download not found'
        }), 404
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🎥 YouTube Video Downloader")
    print("="*60)
    print("✅ Server starting...")
    print("📍 Local:   http://localhost:5000")
    print("🌐 Network: http://0.0.0.0:5000")
    print("\n💡 Press Ctrl+C to stop the server")
    print("="*60 + "\n")
    
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n\n" + "="*60)
        print("👋 Server stopped. Goodbye!")
        print("="*60 + "\n")
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        print("   Check if port 5000 is already in use")
        print("   Try: netstat -ano | findstr :5000")
