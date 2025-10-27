# 🎥 YouTube Video Downloader# 🎥 YouTube Video Downloader



A modern, feature-rich YouTube video downloader with a premium dark-themed UI. Download videos and playlists in multiple quality options with real-time progress tracking and mobile app switching support.A modern, feature-rich YouTube video downloader with a premium dark-themed UI. Download videos and playlists in multiple quality options with real-time progress tracking and mobile app switching support.



![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)

![Python](https://img.shields.io/badge/python-3.8+-green.svg)![Python](https://img.shields.io/badge/python-3.8+-green.svg)

![Flask](https://img.shields.io/badge/flask-3.0.0-red.svg)![Flask](https://img.shields.io/badge/flask-3.0.0-red.svg)



## ✨ Features## ✨ Features



### Core Functionality### Core Functionality

- 🎥 **Single Video & Playlist Downloads** - Download individual videos or entire playlists- 🎥 **Single Video & Playlist Downloads** - Download individual videos or entire playlists

- 📊 **Multiple Quality Options** - Choose from 360p, 720p, 1080p, 4K, or audio-only- 📊 **Multiple Quality Options** - Choose from 360p, 720p, 1080p, 4K, or audio-only

- 🎵 **Audio Extraction** - Download audio-only versions in high quality- 🎵 **Audio Extraction** - Download audio-only versions in high quality

- 📝 **Subtitle Support** - Automatic subtitle download when available- 📝 **Subtitle Support** - Automatic subtitle download when available

- 📦 **Batch Downloads** - Download entire playlists with one click- 📦 **Batch Downloads** - Download entire playlists with one click



### User Experience### User Experience

- 🎨 **Premium Dark Theme** - Modern, eye-friendly interface with light/dark toggle- 🎨 **Premium Dark Theme** - Modern, eye-friendly interface with light/dark toggle

- 📱 **Mobile Optimized** - Fully responsive design for all devices- 📱 **Mobile Optimized** - Fully responsive design for all devices

- ⚡ **Real-time Progress** - Live download progress with speed and percentage- ⚡ **Real-time Progress** - Live download progress with speed and percentage

- 🔄 **Session Persistence** - Resume your session after browser refresh- 🔄 **Session Persistence** - Resume your session after browser refresh

- 📲 **App Switching Support** - Downloads continue even when switching mobile apps- 📲 **App Switching Support** - Downloads continue even when switching mobile apps

- ⚠️ **Download Confirmation** - Confirmation dialog before starting downloads- ⚠️ **Download Confirmation** - Confirmation dialog before starting downloads

- ❌ **Cancel Anytime** - Stop downloads mid-process with proper cleanup- ❌ **Cancel Anytime** - Stop downloads mid-process with proper cleanup



### Technical Features### Technical Features

- 🚀 **Streaming Downloads** - Efficient memory usage with stream processing- 🚀 **Streaming Downloads** - Efficient memory usage with stream processing

- 🔒 **Concurrent Downloads** - Support multiple users downloading simultaneously- 🔒 **Concurrent Downloads** - Support multiple users downloading simultaneously

- 🧹 **Auto Cleanup** - Automatic server file cleanup after downloads- 🧹 **Auto Cleanup** - Automatic server file cleanup after downloads

- 🎯 **Smart Format Selection** - Automatically selects highest bitrate for quality- 🎯 **Smart Format Selection** - Automatically selects highest bitrate for quality

- 🔁 **Retry Logic** - Handles file locking and network interruptions- 🔁 **Retry Logic** - Handles file locking and network interruptions

- 🌐 **CORS Enabled** - Works from any origin- 🌐 **CORS Enabled** - Works from any origin



## 🚀 Quick Start## 🚀 Quick Start



### Prerequisites### Prerequisites

- Python 3.8 or higher- Python 3.8 or higher

- Internet connection- Internet connection

- FFmpeg (optional, for best quality video merging)- FFmpeg (optional, for best quality video merging)



### Installation### Installation



1. **Clone the repository**1. **Clone the repository**

```bash```bash

git clone https://github.com/yourusername/youtube-downloader.gitgit clone https://github.com/yourusername/youtube-downloader.git

cd youtube-downloadercd youtube-downloader

``````



2. **Run the application**2. **Run the application**

```bash

python app.py2. **Extract Playlist**

```

*The app will automatically install missing dependencies on first run*   - All videos are listed with thumbnails```   - Paste any YouTube video URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)



3. **Open in browser**

```

http://localhost:50003. **Download All or Individual**   - Or paste a playlist URL (e.g., `https://www.youtube.com/playlist?list=PLAYLIST_ID`)

```

   - "Download All" button for entire playlist

### Manual Dependency Installation

If auto-install fails, install manually:   - Or select quality for individual videos2. **Run the application**

```bash

pip install -r requirements.txt

```

### Mobile Usage```bash2. **Click "Extract":**

## 📖 How to Use



### Download a Single Video

**App Switching Support:**python app.py   - The application will fetch video information and available formats

1. **Paste YouTube URL** in the input field

   - Example: `https://www.youtube.com/watch?v=VIDEO_ID`- Start download on mobile



2. **Click "Extract Video Info"**- Switch to other apps freely```

   - Application fetches video details and available formats

- Backend continues downloading

3. **Select Quality**

   - Choose from available options (360p, 720p, 1080p, 4K, Audio)- Return to browser - download auto-resumes*The app will automatically install missing dependencies on first run*3. **Choose your quality:**

   - Higher quality requires more time and bandwidth

- File ready when backend completes

4. **Confirm Download**

   - Click confirmation dialog   - Select from available quality options (720p, 1080p, 4K, Audio Only)

   - Download begins with real-time progress

**Important:** Keep browser tab open (don't close completely)

5. **Wait for Completion**

   - Progress bar shows download status3. **Open in browser**

   - File automatically saves to your device

## 🎯 Application Flow

### Download a Playlist

```4. **Download:**

1. **Paste Playlist URL**

   - Example: `https://www.youtube.com/playlist?list=PLAYLIST_ID````



2. **Extract Playlist**User Input (YouTube URL)http://localhost:5000   - Click the download button for your preferred quality

   - All videos are listed with thumbnails

    ↓

3. **Download All or Individual**

   - "Download All" button for entire playlistExtract Video Info (yt-dlp)```   - The download will start automatically

   - Or select quality for individual videos

    ↓

### Mobile Usage

Display Available Formats

**App Switching Support:**

- Start download on mobile    ↓

- Switch to other apps freely

- Backend continues downloadingUser Selects Quality → Confirmation Dialog### Manual Dependency Installation## 🏗️ Project Structure

- Return to browser - download auto-resumes

- File ready when backend completes    ↓



**Important:** Keep browser tab open (don't close completely)Backend Download (Flask + yt-dlp)If auto-install fails, install manually:



## 🎯 Application Flow    ↓



```Real-time Progress Updates (Streaming)```bash```

User Input (YouTube URL)

    ↓    ↓

Extract Video Info (yt-dlp)

    ↓File Transfer to User Devicepip install -r requirements.txty2_vid/

Display Available Formats

    ↓    ↓

User Selects Quality → Confirmation Dialog

    ↓Auto Cleanup Server Files```├── app.py                 # Flask backend with yt-dlp integration

Backend Download (Flask + yt-dlp)

    ↓```

Real-time Progress Updates (Streaming)

    ↓├── requirements.txt       # Python dependencies

File Transfer to User Device

    ↓### Mobile App Switching Flow

Auto Cleanup Server Files

```## 📖 How to Use├── templates/



### Mobile App Switching Flow```



```Download Started│   └── index.html        # Main HTML template

Download Started

    ↓    ↓

User Switches Apps

    ↓User Switches Apps### Download a Single Video├── static/

Frontend JavaScript Suspended

    ↓    ↓

Backend Continues Downloading

    ↓Frontend JavaScript Suspended│   ├── style.css         # Responsive CSS styles

Periodic Status Check (every 3 seconds)

    ↓    ↓

User Returns to Browser

    ↓Backend Continues Downloading1. **Paste YouTube URL** in the input field│   └── script.js         # Frontend JavaScript logic

Status Check Detects Completion

    ↓    ↓

File Auto-Downloads to Device

```Periodic Status Check (every 3 seconds)   - Example: `https://www.youtube.com/watch?v=VIDEO_ID`└── downloads/            # Temporary download directory (auto-created)



## 📁 Project Structure    ↓



```User Returns to Browser```

youtube-downloader/

├── app.py                      # Flask backend server    ↓

├── requirements.txt            # Python dependencies

├── README.md                   # This fileStatus Check Detects Completion2. **Click "Extract Video Info"**

├── templates/

│   └── index.html             # Main UI template    ↓

├── static/

│   ├── style.css              # Responsive stylesFile Auto-Downloads to Device   - Application fetches video details and available formats## 🔧 Technical Details

│   └── script.js              # Frontend logic

├── downloads/                  # Temporary download storage```

└── .github/

    └── copilot-instructions.md # AI development guide

```

## 📁 Project Structure

## ⚙️ Configuration

3. **Select Quality**### Backend (`app.py`)

### Change Server Port

Edit `app.py` (last line):```

```python

app.run(debug=True, host='0.0.0.0', port=5000)  # Change port hereyoutube-downloader/   - Choose from available options (360p, 720p, 1080p, 4K, Audio)- **Framework**: Flask with CORS support

```

├── app.py                      # Flask backend server

### Change Download Folder

Edit `app.py` (line 13):├── requirements.txt            # Python dependencies   - Higher quality requires more time and bandwidth- **Video Extraction**: yt-dlp library for robust YouTube metadata extraction

```python

DOWNLOAD_FOLDER = 'downloads'  # Change folder path├── README.md                   # This file

```

├── .gitignore                  # Git ignore rules- **API Endpoints**:

### Disable Auto-Install

Edit `app.py` - remove/comment the auto-install section├── templates/



## 🔧 Dependencies│   └── index.html             # Main UI template4. **Confirm Download**  - `GET /` - Serves the main web interface



### Core Libraries├── static/

- **Flask 3.0.0** - Web framework

- **flask-cors 4.0.0** - CORS support│   ├── style.css              # Responsive styles   - Click confirmation dialog  - `POST /api/extract` - Extracts video/playlist information

- **yt-dlp 2024.10.22** - YouTube video extraction

│   └── script.js              # Frontend logic

### Optional

- **FFmpeg** - For merging best video + audio quality├── downloads/                  # Temporary download storage   - Download begins with real-time progress  - `POST /api/download` - Provides download URLs

  - Without FFmpeg: Limited to pre-merged formats

  - With FFmpeg: Access to 4K and highest quality options└── .github/



### Installing FFmpeg (Optional)    └── copilot-instructions.md # AI development guide



**Windows:**```

```bash

# Using Chocolatey5. **Wait for Completion**### Frontend

choco install ffmpeg

## ⚙️ Configuration

# Or download from: https://ffmpeg.org/download.html

```   - Progress bar shows download status- **Pure JavaScript**: No framework dependencies for lightweight performance



**Mac:**### Change Server Port

```bash

brew install ffmpegEdit `app.py` (last line):   - File automatically saves to your device- **Responsive Design**: Mobile-first CSS with breakpoints at 768px and 480px

```

```python

**Linux:**

```bashapp.run(debug=True, host='0.0.0.0', port=5000)  # Change port here- **UX Features**: Toast notifications, loading spinners, error handling

sudo apt install ffmpeg  # Ubuntu/Debian

sudo yum install ffmpeg  # CentOS/RHEL```

```

### Download a Playlist

## 🚨 Limitations

### Change Download Folder

### Technical Limitations

- **Age-Restricted Videos** - Cannot download without authenticationEdit `app.py` (line 13):### Quality Format Selection

- **Private Videos** - Requires account access (not supported)

- **Live Streams** - Not supported, only completed videos```python

- **Premium Content** - YouTube Premium exclusive content cannot be downloaded

- **Geographic Restrictions** - Region-locked content may failDOWNLOAD_FOLDER = 'downloads'  # Change folder path1. **Paste Playlist URL**- **720p**: `bestvideo[height<=720]+bestaudio`



### Performance Considerations```

- **4K Videos** - Large file sizes (1-5GB), requires stable connection

- **Playlists** - Downloads sequentially, large playlists take time   - Example: `https://www.youtube.com/playlist?list=PLAYLIST_ID`- **1080p**: `bestvideo[height<=1080]+bestaudio`

- **Concurrent Downloads** - Limited by server resources

- **Server Storage** - Temporary files created, auto-cleanup after 5 seconds### Disable Auto-Install



### Browser/Device LimitationsEdit `app.py` - remove/comment the auto-install section- **4K**: `bestvideo[height<=2160]+bestaudio`

- **Mobile App Switching** - Works but requires keeping browser tab open

- **Browser Closing** - Completely closing browser stops downloads

- **Network Interruption** - May require restart for large files

- **File Size Limits** - Browser may limit download size (varies by device)## 🔧 Dependencies2. **Extract Playlist**- **Audio Only**: `bestaudio` (typically m4a or webm)



### Legal Limitations

⚠️ **Important Notice:**

- Respect copyright laws and YouTube's Terms of Service### Core Libraries   - All videos are listed with thumbnails

- Only download content you have permission to download

- This tool is for personal use only- **Flask 3.0.0** - Web framework

- Do not distribute downloaded copyrighted content

- Some countries have laws against downloading YouTube videos- **flask-cors 4.0.0** - CORS support## 🔒 Security & Compliance



## 🐛 Troubleshooting- **yt-dlp 2024.10.22** - YouTube video extraction



### Downloads Fail3. **Download All or Individual**

```

Issue: "Download failed" error### Optional

Solution: 

  1. Check internet connection- **FFmpeg** - For merging best video + audio quality   - "Download All" button for entire playlist- ⚠️ **Disclaimer**: This tool is for educational purposes only

  2. Try lower quality option

  3. Install FFmpeg for better format support  - Without FFmpeg: Limited to pre-merged formats

  4. Try different video (may be restricted)

```  - With FFmpeg: Access to 4K and highest quality options   - Or select quality for individual videos- Respect YouTube's Terms of Service



### "FFmpeg Required" Message

```

Issue: Cannot download selected quality### Installing FFmpeg (Optional)- URL validation to prevent malicious input

Solution:

  1. Install FFmpeg (see Dependencies section)

  2. Or select a lower quality that doesn't require merging

```**Windows:**### Mobile Usage- No video content is stored on the server



### Port Already in Use```bash

```

Issue: "Address already in use" error# Using Chocolatey- Rate limiting recommended for production deployment

Solution:

  1. Close other applications using port 5000choco install ffmpeg

  2. Or change port in app.py

  3. Kill process: netstat -ano | findstr :5000**App Switching Support:**

```

# Or download from: https://ffmpeg.org/download.html

### Mobile App Switching Not Working

``````- Start download on mobile## 🐛 Troubleshooting

Issue: Download cancelled when switching apps

Solution:

  1. Keep browser tab open (don't swipe close)

  2. Check if download completed on server**Mac:**- Switch to other apps freely

  3. Return to browser within a few minutes

  4. Refresh page and restart if needed```bash

```

brew install ffmpeg- Backend continues downloading### Common Issues

### High Memory Usage

``````

Issue: Server using too much RAM

Solution:- Return to browser - download auto-resumes

  1. Restart the server

  2. Clear downloads folder manually**Linux:**

  3. Avoid downloading multiple 4K videos simultaneously

``````bash- File ready when backend completes1. **"Failed to extract video" error**



## 🔒 Privacy & Securitysudo apt install ffmpeg  # Ubuntu/Debian



- **No Data Collection** - No user data is stored or trackedsudo yum install ffmpeg  # CentOS/RHEL   - Ensure the URL is correct and the video is publicly available

- **Local Processing** - All downloads processed on your server

- **Temporary Storage** - Files auto-deleted after download (5 seconds)```

- **No Analytics** - No third-party analytics or tracking

- **Open Source** - Full code transparency**Important:** Keep browser tab open (don't close completely)   - Age-restricted videos may not work



## 🚀 Performance Tips## 🚨 Limitations



1. **Use Lower Qualities** - Faster downloads, less bandwidth   - Private videos cannot be accessed

2. **Close Other Tabs** - Better streaming performance

3. **Wired Connection** - More stable than WiFi for large files### Technical Limitations

4. **Clear Downloads** - Manually clear old files if needed

5. **Install FFmpeg** - Better quality options and faster merging- **Age-Restricted Videos** - Cannot download without authentication## 🎯 Application Flow



## 📝 Development- **Private Videos** - Requires account access (not supported)



### Local Development- **Live Streams** - Not supported, only completed videos2. **Download not starting**

```bash

# Enable debug mode (auto-reload on changes)- **Premium Content** - YouTube Premium exclusive content cannot be downloaded

python app.py  # Debug mode is enabled by default

- **Geographic Restrictions** - Region-locked content may fail```   - Check your browser's pop-up blocker settings

# Access logs in terminal

# Watch for errors and download progress

```

### Performance ConsiderationsUser Input (YouTube URL)   - Try a different quality option

### Adding Features

See `.github/copilot-instructions.md` for AI-assisted development guidelines- **4K Videos** - Large file sizes (1-5GB), requires stable connection



## 🤝 Contributing- **Playlists** - Downloads sequentially, large playlists take time    ↓



Contributions are welcome! Please:- **Concurrent Downloads** - Limited by server resources

1. Fork the repository

2. Create a feature branch- **Server Storage** - Temporary files created, auto-cleanup after 5 secondsExtract Video Info (yt-dlp)3. **Slow extraction for playlists**

3. Make your changes

4. Test thoroughly

5. Submit a pull request

### Browser/Device Limitations    ↓   - Large playlists (>50 videos) may take longer

## 📄 License

- **Mobile App Switching** - Works but requires keeping browser tab open

This project is provided for educational purposes only. Please respect YouTube's Terms of Service and copyright laws.

- **Browser Closing** - Completely closing browser stops downloadsDisplay Available Formats   - This is normal and depends on YouTube's response time

## 🆘 Support

- **Network Interruption** - May require restart for large files

**Having issues?**

1. Check the Troubleshooting section- **File Size Limits** - Browser may limit download size (varies by device)    ↓

2. Search existing issues on GitHub

3. Create a new issue with detailed description

4. Include error messages and browser console logs

### Legal LimitationsUser Selects Quality → Confirmation Dialog## 🛠️ Development

## 🎯 Roadmap

⚠️ **Important Notice:**

- [ ] Download queue management

- [ ] Resume interrupted downloads- Respect copyright laws and YouTube's Terms of Service    ↓

- [ ] Download history

- [ ] Multiple language subtitles- Only download content you have permission to download

- [ ] Custom output format selection

- [ ] PWA support for mobile installation- This tool is for personal use onlyBackend Download (Flask + yt-dlp)### Running in Development Mode

- [ ] Thumbnail download option

- [ ] Video metadata editing- Do not distribute downloaded copyrighted content



## 🌟 Acknowledgments- Some countries have laws against downloading YouTube videos    ↓```bash



- **yt-dlp** - Powerful YouTube extraction library

- **Flask** - Lightweight web framework

- **Modern UI Design** - Inspired by contemporary web applications## 🐛 TroubleshootingReal-time Progress Updates (Streaming)python app.py



---



**Made with ❤️ for the YouTube community**### Downloads Fail    ↓```



*Last Updated: October 27, 2025*```

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
