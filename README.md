# 🎥 YouTube Video Downloader# YouTube Video Downloader# 🎥 YouTube Video Downloader



A modern, feature-rich YouTube video downloader with a premium dark-themed UI. Download videos and playlists in multiple quality options with real-time progress tracking and mobile app switching support.



![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)A modern, feature-rich YouTube video downloader with a premium dark-themed UI. Download videos and playlists in multiple quality options with real-time progress tracking and mobile app switching support.A modern, feature-rich web application for downloading YouTube videos and playlists with multiple quality options. Built with Flask, yt-dlp, and vanilla JavaScript.

![Python](https://img.shields.io/badge/python-3.8+-green.svg)

![Flask](https://img.shields.io/badge/flask-3.0.0-red.svg)



## ✨ Features![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)## ✨ Features



### Core Functionality![Python](https://img.shields.io/badge/python-3.8+-green.svg)

- 🎥 **Single Video & Playlist Downloads** - Download individual videos or entire playlists

- 📊 **Multiple Quality Options** - Choose from 360p, 720p, 1080p, 4K, or audio-only![Flask](https://img.shields.io/badge/flask-3.0.0-red.svg)- **Single Video & Playlist Support**: Download individual videos or entire playlists

- 🎵 **Audio Extraction** - Download audio-only versions in high quality

- 📝 **Subtitle Support** - Automatic subtitle download when available- **Multiple Quality Options**: Choose from 720p, 1080p, 4K, and audio-only formats

- 📦 **Batch Downloads** - Download entire playlists with one click

## ✨ Features- **Beautiful UI**: Modern, responsive design that works on desktop, tablet, and mobile

### User Experience

- 🎨 **Premium Dark Theme** - Modern, eye-friendly interface with light/dark toggle- **Real-time Progress**: Loading indicators and status messages

- 📱 **Mobile Optimized** - Fully responsive design for all devices

- ⚡ **Real-time Progress** - Live download progress with speed and percentage### Core Functionality- **Error Handling**: Comprehensive error messages with helpful suggestions

- 🔄 **Session Persistence** - Resume your session after browser refresh

- 📲 **App Switching Support** - Downloads continue even when switching mobile apps- 🎥 **Single Video & Playlist Downloads** - Download individual videos or entire playlists- **Fast Processing**: Async processing for playlists to minimize wait times

- ⚠️ **Download Confirmation** - Confirmation dialog before starting downloads

- ❌ **Cancel Anytime** - Stop downloads mid-process with proper cleanup- 📊 **Multiple Quality Options** - Choose from 360p, 720p, 1080p, 4K, or audio-only



### Technical Features- 🎵 **Audio Extraction** - Download audio-only versions in high quality## 🚀 Quick Start

- 🚀 **Streaming Downloads** - Efficient memory usage with stream processing

- 🔒 **Concurrent Downloads** - Support multiple users downloading simultaneously- 📝 **Subtitle Support** - Automatic subtitle download when available

- 🧹 **Auto Cleanup** - Automatic server file cleanup after downloads

- 🎯 **Smart Format Selection** - Automatically selects highest bitrate for quality- 📦 **Batch Downloads** - Download entire playlists with one click### Prerequisites

- 🔁 **Retry Logic** - Handles file locking and network interruptions

- 🌐 **CORS Enabled** - Works from any origin



## 🚀 Quick Start### User Experience- Python 3.8 or higher



### Prerequisites- 🎨 **Premium Dark Theme** - Modern, eye-friendly interface with light/dark toggle- pip (Python package installer)

- Python 3.8 or higher

- Internet connection- 📱 **Mobile Optimized** - Fully responsive design for all devices- **FFmpeg** (Required for high-quality downloads - see [FFMPEG_INSTALL.md](FFMPEG_INSTALL.md))

- FFmpeg (optional, for best quality video merging)

- ⚡ **Real-time Progress** - Live download progress with speed and percentage

### Installation

- 🔄 **Session Persistence** - Resume your session after browser refresh### Installation

1. **Clone the repository**

```bash- 📲 **App Switching Support** - Downloads continue even when switching mobile apps

git clone https://github.com/yourusername/youtube-downloader.git

cd youtube-downloader- ⚠️ **Download Confirmation** - Confirmation dialog before starting downloads1. **Clone or download this repository**

```

- ❌ **Cancel Anytime** - Stop downloads mid-process with proper cleanup

2. **Run the application**

```bash2. **Install dependencies:**

python app.py

```### Technical Features   ```bash

*The app will automatically install missing dependencies on first run*

- 🚀 **Streaming Downloads** - Efficient memory usage with stream processing   pip install -r requirements.txt

3. **Open in browser**

```- 🔒 **Concurrent Downloads** - Support multiple users downloading simultaneously   ```

http://localhost:5000

```- 🧹 **Auto Cleanup** - Automatic server file cleanup after downloads



### Manual Dependency Installation- 🎯 **Smart Format Selection** - Automatically selects highest bitrate for quality3. **Install FFmpeg (Important!):**

If auto-install fails, install manually:

```bash- 🔁 **Retry Logic** - Handles file locking and network interruptions   - Windows: `choco install ffmpeg` or see [FFMPEG_INSTALL.md](FFMPEG_INSTALL.md)

pip install -r requirements.txt

```- 🌐 **CORS Enabled** - Works from any origin   - Without FFmpeg, only pre-merged formats will work (lower quality)



## 📖 How to Use



### Download a Single Video## 🚀 Quick Start4. **Run the application:**



1. **Paste YouTube URL** in the input field   ```bash

   - Example: `https://www.youtube.com/watch?v=VIDEO_ID`

### Prerequisites   python app.py

2. **Click "Extract Video Info"**

   - Application fetches video details and available formats- Python 3.8 or higher   ```



3. **Select Quality**- Internet connection

   - Choose from available options (360p, 720p, 1080p, 4K, Audio)

   - Higher quality requires more time and bandwidth- FFmpeg (optional, for best quality video merging)4. **Open your browser and navigate to:**



4. **Confirm Download**   ```

   - Click confirmation dialog

   - Download begins with real-time progress### Installation   http://127.0.0.1:5000



5. **Wait for Completion**   ```

   - Progress bar shows download status

   - File automatically saves to your device1. **Clone the repository**



### Download a Playlist```bash## 📖 Usage



1. **Paste Playlist URL**git clone https://github.com/yourusername/youtube-downloader.git

   - Example: `https://www.youtube.com/playlist?list=PLAYLIST_ID`

cd youtube-downloader1. **Enter a YouTube URL:**

2. **Extract Playlist**

   - All videos are listed with thumbnails```   - Paste any YouTube video URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)



3. **Download All or Individual**   - Or paste a playlist URL (e.g., `https://www.youtube.com/playlist?list=PLAYLIST_ID`)

   - "Download All" button for entire playlist

   - Or select quality for individual videos2. **Run the application**



### Mobile Usage```bash2. **Click "Extract":**



**App Switching Support:**python app.py   - The application will fetch video information and available formats

- Start download on mobile

- Switch to other apps freely```

- Backend continues downloading

- Return to browser - download auto-resumes*The app will automatically install missing dependencies on first run*3. **Choose your quality:**

- File ready when backend completes

   - Select from available quality options (720p, 1080p, 4K, Audio Only)

**Important:** Keep browser tab open (don't close completely)

3. **Open in browser**

## 🎯 Application Flow

```4. **Download:**

```

User Input (YouTube URL)http://localhost:5000   - Click the download button for your preferred quality

    ↓

Extract Video Info (yt-dlp)```   - The download will start automatically

    ↓

Display Available Formats

    ↓

User Selects Quality → Confirmation Dialog### Manual Dependency Installation## 🏗️ Project Structure

    ↓

Backend Download (Flask + yt-dlp)If auto-install fails, install manually:

    ↓

Real-time Progress Updates (Streaming)```bash```

    ↓

File Transfer to User Devicepip install -r requirements.txty2_vid/

    ↓

Auto Cleanup Server Files```├── app.py                 # Flask backend with yt-dlp integration

```

├── requirements.txt       # Python dependencies

### Mobile App Switching Flow

## 📖 How to Use├── templates/

```

Download Started│   └── index.html        # Main HTML template

    ↓

User Switches Apps### Download a Single Video├── static/

    ↓

Frontend JavaScript Suspended│   ├── style.css         # Responsive CSS styles

    ↓

Backend Continues Downloading1. **Paste YouTube URL** in the input field│   └── script.js         # Frontend JavaScript logic

    ↓

Periodic Status Check (every 3 seconds)   - Example: `https://www.youtube.com/watch?v=VIDEO_ID`└── downloads/            # Temporary download directory (auto-created)

    ↓

User Returns to Browser```

    ↓

Status Check Detects Completion2. **Click "Extract Video Info"**

    ↓

File Auto-Downloads to Device   - Application fetches video details and available formats## 🔧 Technical Details

```



## 📁 Project Structure

3. **Select Quality**### Backend (`app.py`)

```

youtube-downloader/   - Choose from available options (360p, 720p, 1080p, 4K, Audio)- **Framework**: Flask with CORS support

├── app.py                      # Flask backend server

├── requirements.txt            # Python dependencies   - Higher quality requires more time and bandwidth- **Video Extraction**: yt-dlp library for robust YouTube metadata extraction

├── README.md                   # This file

├── .gitignore                  # Git ignore rules- **API Endpoints**:

├── templates/

│   └── index.html             # Main UI template4. **Confirm Download**  - `GET /` - Serves the main web interface

├── static/

│   ├── style.css              # Responsive styles   - Click confirmation dialog  - `POST /api/extract` - Extracts video/playlist information

│   └── script.js              # Frontend logic

├── downloads/                  # Temporary download storage   - Download begins with real-time progress  - `POST /api/download` - Provides download URLs

└── .github/

    └── copilot-instructions.md # AI development guide

```

5. **Wait for Completion**### Frontend

## ⚙️ Configuration

   - Progress bar shows download status- **Pure JavaScript**: No framework dependencies for lightweight performance

### Change Server Port

Edit `app.py` (last line):   - File automatically saves to your device- **Responsive Design**: Mobile-first CSS with breakpoints at 768px and 480px

```python

app.run(debug=True, host='0.0.0.0', port=5000)  # Change port here- **UX Features**: Toast notifications, loading spinners, error handling

```

### Download a Playlist

### Change Download Folder

Edit `app.py` (line 13):### Quality Format Selection

```python

DOWNLOAD_FOLDER = 'downloads'  # Change folder path1. **Paste Playlist URL**- **720p**: `bestvideo[height<=720]+bestaudio`

```

   - Example: `https://www.youtube.com/playlist?list=PLAYLIST_ID`- **1080p**: `bestvideo[height<=1080]+bestaudio`

### Disable Auto-Install

Edit `app.py` - remove/comment the auto-install section- **4K**: `bestvideo[height<=2160]+bestaudio`



## 🔧 Dependencies2. **Extract Playlist**- **Audio Only**: `bestaudio` (typically m4a or webm)



### Core Libraries   - All videos are listed with thumbnails

- **Flask 3.0.0** - Web framework

- **flask-cors 4.0.0** - CORS support## 🔒 Security & Compliance

- **yt-dlp 2024.10.22** - YouTube video extraction

3. **Download All or Individual**

### Optional

- **FFmpeg** - For merging best video + audio quality   - "Download All" button for entire playlist- ⚠️ **Disclaimer**: This tool is for educational purposes only

  - Without FFmpeg: Limited to pre-merged formats

  - With FFmpeg: Access to 4K and highest quality options   - Or select quality for individual videos- Respect YouTube's Terms of Service



### Installing FFmpeg (Optional)- URL validation to prevent malicious input



**Windows:**### Mobile Usage- No video content is stored on the server

```bash

# Using Chocolatey- Rate limiting recommended for production deployment

choco install ffmpeg

**App Switching Support:**

# Or download from: https://ffmpeg.org/download.html

```- Start download on mobile## 🐛 Troubleshooting



**Mac:**- Switch to other apps freely

```bash

brew install ffmpeg- Backend continues downloading### Common Issues

```

- Return to browser - download auto-resumes

**Linux:**

```bash- File ready when backend completes1. **"Failed to extract video" error**

sudo apt install ffmpeg  # Ubuntu/Debian

sudo yum install ffmpeg  # CentOS/RHEL   - Ensure the URL is correct and the video is publicly available

```

**Important:** Keep browser tab open (don't close completely)   - Age-restricted videos may not work

## 🚨 Limitations

   - Private videos cannot be accessed

### Technical Limitations

- **Age-Restricted Videos** - Cannot download without authentication## 🎯 Application Flow

- **Private Videos** - Requires account access (not supported)

- **Live Streams** - Not supported, only completed videos2. **Download not starting**

- **Premium Content** - YouTube Premium exclusive content cannot be downloaded

- **Geographic Restrictions** - Region-locked content may fail```   - Check your browser's pop-up blocker settings



### Performance ConsiderationsUser Input (YouTube URL)   - Try a different quality option

- **4K Videos** - Large file sizes (1-5GB), requires stable connection

- **Playlists** - Downloads sequentially, large playlists take time    ↓

- **Concurrent Downloads** - Limited by server resources

- **Server Storage** - Temporary files created, auto-cleanup after 5 secondsExtract Video Info (yt-dlp)3. **Slow extraction for playlists**



### Browser/Device Limitations    ↓   - Large playlists (>50 videos) may take longer

- **Mobile App Switching** - Works but requires keeping browser tab open

- **Browser Closing** - Completely closing browser stops downloadsDisplay Available Formats   - This is normal and depends on YouTube's response time

- **Network Interruption** - May require restart for large files

- **File Size Limits** - Browser may limit download size (varies by device)    ↓



### Legal LimitationsUser Selects Quality → Confirmation Dialog## 🛠️ Development

⚠️ **Important Notice:**

- Respect copyright laws and YouTube's Terms of Service    ↓

- Only download content you have permission to download

- This tool is for personal use onlyBackend Download (Flask + yt-dlp)### Running in Development Mode

- Do not distribute downloaded copyrighted content

- Some countries have laws against downloading YouTube videos    ↓```bash



## 🐛 TroubleshootingReal-time Progress Updates (Streaming)python app.py



### Downloads Fail    ↓```

```

Issue: "Download failed" errorFile Transfer to User DeviceThe app runs with debug mode enabled on `http://0.0.0.0:5000`

Solution: 

  1. Check internet connection    ↓

  2. Try lower quality option

  3. Install FFmpeg for better format supportAuto Cleanup Server Files### Testing Different Scenarios

  4. Try different video (may be restricted)

``````- **Single Video**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`



### "FFmpeg Required" Message- **Playlist**: `https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf`

```

Issue: Cannot download selected quality### Mobile App Switching Flow- **Short Video**: `https://www.youtube.com/shorts/VIDEO_ID`

Solution:

  1. Install FFmpeg (see Dependencies section)

  2. Or select a lower quality that doesn't require merging

``````## 📦 Dependencies



### Port Already in UseDownload Started

```

Issue: "Address already in use" error    ↓- **Flask**: Web framework

Solution:

  1. Close other applications using port 5000User Switches Apps- **flask-cors**: CORS support for API endpoints

  2. Or change port in app.py

  3. Kill process: netstat -ano | findstr :5000    ↓- **yt-dlp**: YouTube video extraction library

```

Frontend JavaScript Suspended- **requests**: HTTP library for API calls

### Mobile App Switching Not Working

```    ↓

Issue: Download cancelled when switching apps

Solution:Backend Continues Downloading## 🎯 Future Enhancements

  1. Keep browser tab open (don't swipe close)

  2. Check if download completed on server    ↓

  3. Return to browser within a few minutes

  4. Refresh page and restart if neededPeriodic Status Check (every 3 seconds)- [ ] Batch download for playlists

```

    ↓- [ ] Download progress tracking

### High Memory Usage

```User Returns to Browser- [ ] Video preview before download

Issue: Server using too much RAM

Solution:    ↓- [ ] Custom quality selection

  1. Restart the server

  2. Clear downloads folder manuallyStatus Check Detects Completion- [ ] Download history

  3. Avoid downloading multiple 4K videos simultaneously

```    ↓- [ ] User authentication



## 🔒 Privacy & SecurityFile Auto-Downloads to Device- [ ] Rate limiting implementation



- **No Data Collection** - No user data is stored or tracked```

- **Local Processing** - All downloads processed on your server

- **Temporary Storage** - Files auto-deleted after download (5 seconds)## 📄 License

- **No Analytics** - No third-party analytics or tracking

- **Open Source** - Full code transparency## 📁 Project Structure



## 🚀 Performance TipsThis project is for educational purposes. Please ensure compliance with YouTube's Terms of Service and applicable copyright laws when using this application.



1. **Use Lower Qualities** - Faster downloads, less bandwidth```

2. **Close Other Tabs** - Better streaming performance

3. **Wired Connection** - More stable than WiFi for large filesyoutube-downloader/## 👨‍💻 Author

4. **Clear Downloads** - Manually clear old files if needed

5. **Install FFmpeg** - Better quality options and faster merging├── app.py                      # Flask backend server



## 📝 Development├── requirements.txt            # Python dependenciesBuilt for hackathon challenge - YouTube Video Downloader



### Local Development├── README.md                   # This file

```bash

# Enable debug mode (auto-reload on changes)├── .gitignore                  # Git ignore rules## 🙏 Acknowledgments

python app.py  # Debug mode is enabled by default

├── templates/

# Access logs in terminal

# Watch for errors and download progress│   └── index.html             # Main UI template- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Powerful YouTube downloader

```

├── static/- [Flask](https://flask.palletsprojects.com/) - Web framework

### Adding Features

See `.github/copilot-instructions.md` for AI-assisted development guidelines│   ├── style.css              # Responsive styles- YouTube API for video metadata



## 🤝 Contributing│   └── script.js              # Frontend logic



Contributions are welcome! Please:├── downloads/                  # Temporary download storage---

1. Fork the repository

2. Create a feature branch└── .github/

3. Make your changes

4. Test thoroughly    └── copilot-instructions.md # AI development guide**Note**: Always respect content creators' rights and YouTube's Terms of Service. This tool should be used responsibly and legally.

5. Submit a pull request

```

## 📄 License

## ⚙️ Configuration

This project is provided for educational purposes only. Please respect YouTube's Terms of Service and copyright laws.

### Change Server Port

## 🆘 SupportEdit `app.py` (last line):

```python

**Having issues?**app.run(debug=True, host='0.0.0.0', port=5000)  # Change port here

1. Check the Troubleshooting section```

2. Search existing issues on GitHub

3. Create a new issue with detailed description### Change Download Folder

4. Include error messages and browser console logsEdit `app.py` (line 13):

```python

## 🎯 RoadmapDOWNLOAD_FOLDER = 'downloads'  # Change folder path

```

- [ ] Download queue management

- [ ] Resume interrupted downloads### Disable Auto-Install

- [ ] Download historyEdit `app.py` - remove/comment the auto-install section

- [ ] Multiple language subtitles

- [ ] Custom output format selection## 🔧 Dependencies

- [ ] PWA support for mobile installation

- [ ] Thumbnail download option### Core Libraries

- [ ] Video metadata editing- **Flask 3.0.0** - Web framework

- **flask-cors 4.0.0** - CORS support

## 🌟 Acknowledgments- **yt-dlp 2024.10.22** - YouTube video extraction



- **yt-dlp** - Powerful YouTube extraction library### Optional

- **Flask** - Lightweight web framework- **FFmpeg** - For merging best video + audio quality

- **Modern UI Design** - Inspired by contemporary web applications  - Without FFmpeg: Limited to pre-merged formats

  - With FFmpeg: Access to 4K and highest quality options

---

### Installing FFmpeg (Optional)

**Made with ❤️ for the YouTube community**

**Windows:**

*Last Updated: October 27, 2025*```bash
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
