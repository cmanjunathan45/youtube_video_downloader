# YouTube Video Downloader# 🎥 YouTube Video Downloader



A modern, feature-rich YouTube video downloader with a premium dark-themed UI. Download videos and playlists in multiple quality options with real-time progress tracking and mobile app switching support.A modern, feature-rich web application for downloading YouTube videos and playlists with multiple quality options. Built with Flask, yt-dlp, and vanilla JavaScript.



![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)## ✨ Features

![Python](https://img.shields.io/badge/python-3.8+-green.svg)

![Flask](https://img.shields.io/badge/flask-3.0.0-red.svg)- **Single Video & Playlist Support**: Download individual videos or entire playlists

- **Multiple Quality Options**: Choose from 720p, 1080p, 4K, and audio-only formats

## ✨ Features- **Beautiful UI**: Modern, responsive design that works on desktop, tablet, and mobile

- **Real-time Progress**: Loading indicators and status messages

### Core Functionality- **Error Handling**: Comprehensive error messages with helpful suggestions

- 🎥 **Single Video & Playlist Downloads** - Download individual videos or entire playlists- **Fast Processing**: Async processing for playlists to minimize wait times

- 📊 **Multiple Quality Options** - Choose from 360p, 720p, 1080p, 4K, or audio-only

- 🎵 **Audio Extraction** - Download audio-only versions in high quality## 🚀 Quick Start

- 📝 **Subtitle Support** - Automatic subtitle download when available

- 📦 **Batch Downloads** - Download entire playlists with one click### Prerequisites



### User Experience- Python 3.8 or higher

- 🎨 **Premium Dark Theme** - Modern, eye-friendly interface with light/dark toggle- pip (Python package installer)

- 📱 **Mobile Optimized** - Fully responsive design for all devices- **FFmpeg** (Required for high-quality downloads - see [FFMPEG_INSTALL.md](FFMPEG_INSTALL.md))

- ⚡ **Real-time Progress** - Live download progress with speed and percentage

- 🔄 **Session Persistence** - Resume your session after browser refresh### Installation

- 📲 **App Switching Support** - Downloads continue even when switching mobile apps

- ⚠️ **Download Confirmation** - Confirmation dialog before starting downloads1. **Clone or download this repository**

- ❌ **Cancel Anytime** - Stop downloads mid-process with proper cleanup

2. **Install dependencies:**

### Technical Features   ```bash

- 🚀 **Streaming Downloads** - Efficient memory usage with stream processing   pip install -r requirements.txt

- 🔒 **Concurrent Downloads** - Support multiple users downloading simultaneously   ```

- 🧹 **Auto Cleanup** - Automatic server file cleanup after downloads

- 🎯 **Smart Format Selection** - Automatically selects highest bitrate for quality3. **Install FFmpeg (Important!):**

- 🔁 **Retry Logic** - Handles file locking and network interruptions   - Windows: `choco install ffmpeg` or see [FFMPEG_INSTALL.md](FFMPEG_INSTALL.md)

- 🌐 **CORS Enabled** - Works from any origin   - Without FFmpeg, only pre-merged formats will work (lower quality)



## 🚀 Quick Start4. **Run the application:**

   ```bash

### Prerequisites   python app.py

- Python 3.8 or higher   ```

- Internet connection

- FFmpeg (optional, for best quality video merging)4. **Open your browser and navigate to:**

   ```

### Installation   http://127.0.0.1:5000

   ```

1. **Clone the repository**

```bash## 📖 Usage

git clone https://github.com/yourusername/youtube-downloader.git

cd youtube-downloader1. **Enter a YouTube URL:**

```   - Paste any YouTube video URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)

   - Or paste a playlist URL (e.g., `https://www.youtube.com/playlist?list=PLAYLIST_ID`)

2. **Run the application**

```bash2. **Click "Extract":**

python app.py   - The application will fetch video information and available formats

```

*The app will automatically install missing dependencies on first run*3. **Choose your quality:**

   - Select from available quality options (720p, 1080p, 4K, Audio Only)

3. **Open in browser**

```4. **Download:**

http://localhost:5000   - Click the download button for your preferred quality

```   - The download will start automatically



### Manual Dependency Installation## 🏗️ Project Structure

If auto-install fails, install manually:

```bash```

pip install -r requirements.txty2_vid/

```├── app.py                 # Flask backend with yt-dlp integration

├── requirements.txt       # Python dependencies

## 📖 How to Use├── templates/

│   └── index.html        # Main HTML template

### Download a Single Video├── static/

│   ├── style.css         # Responsive CSS styles

1. **Paste YouTube URL** in the input field│   └── script.js         # Frontend JavaScript logic

   - Example: `https://www.youtube.com/watch?v=VIDEO_ID`└── downloads/            # Temporary download directory (auto-created)

```

2. **Click "Extract Video Info"**

   - Application fetches video details and available formats## 🔧 Technical Details



3. **Select Quality**### Backend (`app.py`)

   - Choose from available options (360p, 720p, 1080p, 4K, Audio)- **Framework**: Flask with CORS support

   - Higher quality requires more time and bandwidth- **Video Extraction**: yt-dlp library for robust YouTube metadata extraction

- **API Endpoints**:

4. **Confirm Download**  - `GET /` - Serves the main web interface

   - Click confirmation dialog  - `POST /api/extract` - Extracts video/playlist information

   - Download begins with real-time progress  - `POST /api/download` - Provides download URLs



5. **Wait for Completion**### Frontend

   - Progress bar shows download status- **Pure JavaScript**: No framework dependencies for lightweight performance

   - File automatically saves to your device- **Responsive Design**: Mobile-first CSS with breakpoints at 768px and 480px

- **UX Features**: Toast notifications, loading spinners, error handling

### Download a Playlist

### Quality Format Selection

1. **Paste Playlist URL**- **720p**: `bestvideo[height<=720]+bestaudio`

   - Example: `https://www.youtube.com/playlist?list=PLAYLIST_ID`- **1080p**: `bestvideo[height<=1080]+bestaudio`

- **4K**: `bestvideo[height<=2160]+bestaudio`

2. **Extract Playlist**- **Audio Only**: `bestaudio` (typically m4a or webm)

   - All videos are listed with thumbnails

## 🔒 Security & Compliance

3. **Download All or Individual**

   - "Download All" button for entire playlist- ⚠️ **Disclaimer**: This tool is for educational purposes only

   - Or select quality for individual videos- Respect YouTube's Terms of Service

- URL validation to prevent malicious input

### Mobile Usage- No video content is stored on the server

- Rate limiting recommended for production deployment

**App Switching Support:**

- Start download on mobile## 🐛 Troubleshooting

- Switch to other apps freely

- Backend continues downloading### Common Issues

- Return to browser - download auto-resumes

- File ready when backend completes1. **"Failed to extract video" error**

   - Ensure the URL is correct and the video is publicly available

**Important:** Keep browser tab open (don't close completely)   - Age-restricted videos may not work

   - Private videos cannot be accessed

## 🎯 Application Flow

2. **Download not starting**

```   - Check your browser's pop-up blocker settings

User Input (YouTube URL)   - Try a different quality option

    ↓

Extract Video Info (yt-dlp)3. **Slow extraction for playlists**

    ↓   - Large playlists (>50 videos) may take longer

Display Available Formats   - This is normal and depends on YouTube's response time

    ↓

User Selects Quality → Confirmation Dialog## 🛠️ Development

    ↓

Backend Download (Flask + yt-dlp)### Running in Development Mode

    ↓```bash

Real-time Progress Updates (Streaming)python app.py

    ↓```

File Transfer to User DeviceThe app runs with debug mode enabled on `http://0.0.0.0:5000`

    ↓

Auto Cleanup Server Files### Testing Different Scenarios

```- **Single Video**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

- **Playlist**: `https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf`

### Mobile App Switching Flow- **Short Video**: `https://www.youtube.com/shorts/VIDEO_ID`



```## 📦 Dependencies

Download Started

    ↓- **Flask**: Web framework

User Switches Apps- **flask-cors**: CORS support for API endpoints

    ↓- **yt-dlp**: YouTube video extraction library

Frontend JavaScript Suspended- **requests**: HTTP library for API calls

    ↓

Backend Continues Downloading## 🎯 Future Enhancements

    ↓

Periodic Status Check (every 3 seconds)- [ ] Batch download for playlists

    ↓- [ ] Download progress tracking

User Returns to Browser- [ ] Video preview before download

    ↓- [ ] Custom quality selection

Status Check Detects Completion- [ ] Download history

    ↓- [ ] User authentication

File Auto-Downloads to Device- [ ] Rate limiting implementation

```

## 📄 License

## 📁 Project Structure

This project is for educational purposes. Please ensure compliance with YouTube's Terms of Service and applicable copyright laws when using this application.

```

youtube-downloader/## 👨‍💻 Author

├── app.py                      # Flask backend server

├── requirements.txt            # Python dependenciesBuilt for hackathon challenge - YouTube Video Downloader

├── README.md                   # This file

├── .gitignore                  # Git ignore rules## 🙏 Acknowledgments

├── templates/

│   └── index.html             # Main UI template- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Powerful YouTube downloader

├── static/- [Flask](https://flask.palletsprojects.com/) - Web framework

│   ├── style.css              # Responsive styles- YouTube API for video metadata

│   └── script.js              # Frontend logic

├── downloads/                  # Temporary download storage---

└── .github/

    └── copilot-instructions.md # AI development guide**Note**: Always respect content creators' rights and YouTube's Terms of Service. This tool should be used responsibly and legally.

```

## ⚙️ Configuration

### Change Server Port
Edit `app.py` (last line):
```python
app.run(debug=True, host='0.0.0.0', port=5000)  # Change port here
```

### Change Download Folder
Edit `app.py` (line 13):
```python
DOWNLOAD_FOLDER = 'downloads'  # Change folder path
```

### Disable Auto-Install
Edit `app.py` - remove/comment the auto-install section

## 🔧 Dependencies

### Core Libraries
- **Flask 3.0.0** - Web framework
- **flask-cors 4.0.0** - CORS support
- **yt-dlp 2024.10.22** - YouTube video extraction

### Optional
- **FFmpeg** - For merging best video + audio quality
  - Without FFmpeg: Limited to pre-merged formats
  - With FFmpeg: Access to 4K and highest quality options

### Installing FFmpeg (Optional)

**Windows:**
```bash
# Using Chocolatey
choco install ffmpeg

# Or download from: https://ffmpeg.org/download.html
```

**Mac:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt install ffmpeg  # Ubuntu/Debian
sudo yum install ffmpeg  # CentOS/RHEL
```

## 🚨 Limitations

### Technical Limitations
- **Age-Restricted Videos** - Cannot download without authentication
- **Private Videos** - Requires account access (not supported)
- **Live Streams** - Not supported, only completed videos
- **Premium Content** - YouTube Premium exclusive content cannot be downloaded
- **Geographic Restrictions** - Region-locked content may fail

### Performance Considerations
- **4K Videos** - Large file sizes (1-5GB), requires stable connection
- **Playlists** - Downloads sequentially, large playlists take time
- **Concurrent Downloads** - Limited by server resources
- **Server Storage** - Temporary files created, auto-cleanup after 5 seconds

### Browser/Device Limitations
- **Mobile App Switching** - Works but requires keeping browser tab open
- **Browser Closing** - Completely closing browser stops downloads
- **Network Interruption** - May require restart for large files
- **File Size Limits** - Browser may limit download size (varies by device)

### Legal Limitations
⚠️ **Important Notice:**
- Respect copyright laws and YouTube's Terms of Service
- Only download content you have permission to download
- This tool is for personal use only
- Do not distribute downloaded copyrighted content
- Some countries have laws against downloading YouTube videos

## 🐛 Troubleshooting

### Downloads Fail
```
Issue: "Download failed" error
Solution: 
  1. Check internet connection
  2. Try lower quality option
  3. Install FFmpeg for better format support
  4. Try different video (may be restricted)
```

### "FFmpeg Required" Message
```
Issue: Cannot download selected quality
Solution:
  1. Install FFmpeg (see Dependencies section)
  2. Or select a lower quality that doesn't require merging
```

### Port Already in Use
```
Issue: "Address already in use" error
Solution:
  1. Close other applications using port 5000
  2. Or change port in app.py
  3. Kill process: netstat -ano | findstr :5000
```

### Mobile App Switching Not Working
```
Issue: Download cancelled when switching apps
Solution:
  1. Keep browser tab open (don't swipe close)
  2. Check if download completed on server
  3. Return to browser within a few minutes
  4. Refresh page and restart if needed
```

### High Memory Usage
```
Issue: Server using too much RAM
Solution:
  1. Restart the server
  2. Clear downloads folder manually
  3. Avoid downloading multiple 4K videos simultaneously
```

## 🔒 Privacy & Security

- **No Data Collection** - No user data is stored or tracked
- **Local Processing** - All downloads processed on your server
- **Temporary Storage** - Files auto-deleted after download (5 seconds)
- **No Analytics** - No third-party analytics or tracking
- **Open Source** - Full code transparency

## 🚀 Performance Tips

1. **Use Lower Qualities** - Faster downloads, less bandwidth
2. **Close Other Tabs** - Better streaming performance
3. **Wired Connection** - More stable than WiFi for large files
4. **Clear Downloads** - Manually clear old files if needed
5. **Install FFmpeg** - Better quality options and faster merging

## 📝 Development

### Local Development
```bash
# Enable debug mode (auto-reload on changes)
python app.py  # Debug mode is enabled by default

# Access logs in terminal
# Watch for errors and download progress
```

### Adding Features
See `.github/copilot-instructions.md` for AI-assisted development guidelines

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is provided for educational purposes only. Please respect YouTube's Terms of Service and copyright laws.

## 🆘 Support

**Having issues?**
1. Check the Troubleshooting section
2. Search existing issues on GitHub
3. Create a new issue with detailed description
4. Include error messages and browser console logs

## 🎯 Roadmap

- [ ] Download queue management
- [ ] Resume interrupted downloads
- [ ] Download history
- [ ] Multiple language subtitles
- [ ] Custom output format selection
- [ ] PWA support for mobile installation
- [ ] Thumbnail download option
- [ ] Video metadata editing

## 🌟 Acknowledgments

- **yt-dlp** - Powerful YouTube extraction library
- **Flask** - Lightweight web framework
- **Modern UI Design** - Inspired by contemporary web applications

---

**Made with ❤️ for the YouTube community**

*Last Updated: October 26, 2025*
