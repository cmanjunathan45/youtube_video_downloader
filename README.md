<div align="center">

# 🎥 YouTube Video Downloader

Modern, fast, and mobile-friendly YouTube (and playlist) downloader built with Flask + yt-dlp + vanilla JavaScript. Supports multi‑quality video, audio-only, subtitles, cancellation, mobile app switching recovery, and automatic server cleanup.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Python](https://img.shields.io/badge/Python-3.8+-green.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-black.svg)
![yt-dlp](https://img.shields.io/badge/yt--dlp-2024.10.22-orange.svg)
![Status](https://img.shields.io/badge/status-Production%20Ready-success.svg)

</div>

---

## 📑 Table of Contents
1. [Features](#-features)
2. [Architecture Overview](#-architecture-overview)
3. [Project Structure](#-project-structure)
4. [Quick Start](#-quick-start)
5. [Usage Guide](#-usage-guide)
6. [API Endpoints](#-api-endpoints)
7. [Quality & Format Mapping](#-quality--format-mapping)
8. [Application Flow](#-application-flow)
9. [Configuration](#-configuration)
10. [Performance & Limitations](#-performance--limitations)
11. [Security & Privacy](#-security--privacy)
12. [Troubleshooting](#-troubleshooting)
13. [Roadmap](#-roadmap)
14. [Contributing](#-contributing)
15. [License & Legal Notice](#-license--legal-notice)
16. [Acknowledgments](#-acknowledgments)

---

## ✨ Features
### Core
- 🎥 Single video & full playlist downloads
- 📊 Multiple qualities: 360p, 720p, 1080p, 4K, audio-only
- 🎵 High quality audio extraction
- 📝 Subtitles (auto when available)
- 📦 Batch playlist handling
- ❌ Mid-download cancellation & safe cleanup

### User Experience
- 🌙 Dark / light theme toggle
- 📱 Mobile-first responsive UI
- 🔄 Session persistence (localStorage restore < 24h)
- 🔁 Mobile app switching recovery (background completion + status polling)
- ⚠️ Explicit confirmation before large downloads
- 🔔 Toast notifications (success / error / warning)

### Technical
- 🚀 Streaming responses (no large in-memory buffering)
- 🔒 Concurrent download isolation (unique IDs)
- 🧹 Auto file cleanup (with retry & backoff)
- 🎯 Smart format selection (best bitrate within size constraints)
- 🔁 Resilient against transient file locks (Windows)
- 🌐 CORS enabled for external frontends

### Resilience / Safety
- ⏳ Progress hooks & status endpoint
- 🛑 Graceful cancellation via flag + exception trap
- 🧪 Structured error JSON (including ffmpeg_required hints)

---

## 🏛 Architecture Overview
| Layer | Purpose | Key Technologies |
|-------|---------|------------------|
| Flask Backend | Routing, extraction orchestration, streaming proxy | Flask 3.0, yt-dlp, threading |
| Extraction Engine | Video/playlist metadata & media retrieval | yt-dlp (FFmpeg optional) |
| Frontend (Vanilla JS) | SPA-like interactions, polling, state restore | Fetch API, localStorage |
| State Tracking | Cancellation & completion | `active_downloads`, `download_status` dicts |
| Cleanup | Temporary file lifecycle | Timed deletion + retry thread |

---

## 📁 Project Structure
```
y2_vid/
├── app.py                      # Flask backend + yt-dlp integration & routes
├── requirements.txt            # Python dependencies
├── README.md                   # Project documentation (this file)
├── README_backup.md            # Previous README snapshot
├── templates/
│   └── index.html              # Main UI template
├── static/
│   ├── style.css               # Responsive styles & theme variables
│   └── script.js               # Frontend logic & API orchestration
├── downloads/                  # Temporary storage (auto-cleaned)
└── .github/
    └── copilot-instructions.md # AI development & maintenance guide
```

---

## 🚀 Quick Start
### Prerequisites
- Python 3.8+
- Internet connection
- (Optional) FFmpeg for highest quality (video+audio merging / 4K)

### Installation & Run
```bash
git clone https://github.com/yourusername/youtube-downloader.git
cd youtube-downloader
python app.py   # Auto installs missing dependencies on first run
```
Visit: http://127.0.0.1:5000

### Manual Dependency Install
```bash
pip install -r requirements.txt
```

### FFmpeg (Optional)
Windows (Chocolatey):
```powershell
choco install ffmpeg
```
macOS (Homebrew):
```bash
brew install ffmpeg
```
Linux:
```bash
sudo apt install ffmpeg       # Debian/Ubuntu
sudo yum install ffmpeg       # CentOS/RHEL
```

---

## 🎮 Usage Guide
### Single Video
1. Paste video URL (`https://www.youtube.com/watch?v=VIDEO_ID`)
2. Click "Extract Video Info"
3. Choose a quality option
4. Confirm in modal
5. Download begins; progress tracked & file saved

### Playlist
1. Paste playlist URL (`https://www.youtube.com/playlist?list=PLAYLIST_ID`)
2. Extract to list all videos
3. Download all or choose per-video quality

### Mobile App Switching
- Start download → switch apps → return later
- Page visibility triggers polling every 3s until completion
- Auto-download triggers once backend marks status `complete`

### Cancellation
- Click cancel → backend raises `DownloadCancelled` → temp file cleaned (with retries)

### Session Restore
- Previous extraction + rendered results restored if < 24h and no active download

---

## 🔌 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Main UI |
| POST | `/api/extract` | Extract video or playlist metadata |
| POST | `/api/download` | Initiate download (proxy + progress hook) |
| GET | `/api/get-file/<filename>` | Stream a prepared file to client |
| DELETE | `/api/cleanup/<filename>` | Manual file cleanup (fallback) |
| POST | `/api/cancel-download/<video_id>/<dl_id>` | Cancel active download |
| GET | `/api/download-status/<video_id>/<dl_id>` | Poll for completion status |

---

## 🧪 Quality & Format Mapping
| Label | yt-dlp Selector | Notes |
|-------|-----------------|-------|
| 360p | `bestvideo[height<=360]+bestaudio/best[height<=360]` | Fallback to `best` if separate streams unavailable |
| 720p | `bestvideo[height<=720]+bestaudio/best[height<=720]` | Requires FFmpeg if separate mux needed |
| 1080p | `bestvideo[height<=1080]+bestaudio/best[height<=1080]` | HD stream merges video+audio |
| 4K | `bestvideo[height<=2160]+bestaudio/best[height<=2160]` | High bandwidth; FFmpeg strongly recommended |
| Audio | `bestaudio/best` | Typically m4a/webm |

---

## 🧭 Application Flow
```
User URL Input
    ↓
/api/extract (yt-dlp metadata)
    ↓
Render format buttons
    ↓
User selects quality → confirm
    ↓
/api/download (progress hook → temp file)
    ↓
Status polling (/api/download-status)
    ↓
File ready → /api/get-file/<filename>
    ↓
Auto cleanup (5s delayed + retries)
```

### Mobile Visibility Flow
```
Start download
    ↓
Tab hidden (mobile switch)
    ↓
Backend continues → active_downloads
    ↓
User returns → polling resumes
    ↓
Status = complete → auto-download
```

---

## 🔧 Configuration
| Option | Location | Default | Purpose |
|--------|----------|---------|---------|
| `DOWNLOAD_FOLDER` | `app.py` | `downloads` | Temp storage path |
| Flask `port` | `app.run(...)` | `5000` | Server port |
| `debug` | `app.run(...)` | `True` (dev) | Auto-reload & verbose errors |
| (Future) `MAX_CONCURRENT_DOWNLOADS` | env | `None` | Rate limiting guard |

Change port example:
```python
app.run(debug=True, host="0.0.0.0", port=5000)
```

---

## ⚙️ Performance & Limitations
### Current Optimizations
- Streaming responses (low memory footprint)
- Throttled progress updates (≤10/sec)
- Unique filenames (timestamp + UUID fragment)
- Retry cleanup (file lock safety)
- Session restore avoids redundant extraction

### Known Technical Limits
- No resume of partially interrupted downloads
- Playlist items processed sequentially (no parallel merges)
- Live streams & age-restricted/private videos unsupported
- High-bitrate 4K merges depend on FFmpeg availability

### Practical Considerations
- Large playlists (>50) may appear slow (YouTube response latency)
- 4K files can exceed several GB (stable connection required)
- Browser/tab fully closed stops client-side polling (backend still finishes)

### Legal Notice
Use responsibly. Only download content you are authorized to access. Respect YouTube Terms of Service; laws vary by jurisdiction.

---

## 🔐 Security & Privacy
- Input URL validation (basic regex + context checks)
- Filenames sanitized (ASCII-safe pattern)
- No persistent user data or analytics
- Temporary files deleted shortly after transfer
- CORS enabled (adjust for production security posture)
- Recommended (future): IP rate limiting / auth / HTTPS termination

---

## 🆘 Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| "Download failed" | Restricted / transient network | Try lower quality / different video / verify connectivity |
| "FFmpeg required" | Muxing separate video+audio | Install FFmpeg or choose lower merged format |
| Port 5000 in use | Another process bound | Change port or free with `netstat -ano | findstr :5000` then `taskkill /PID <pid> /F` |
| Cancels on mobile switch | Tab fully closed | Keep tab open; rely on visibility polling |
| High memory usage | Many concurrent HD merges | Reduce simultaneous 4K downloads / restart server |
| Stuck cleanup | OS file lock (Windows) | Manual delete from `downloads/` after a short wait |

### Diagnostic Commands (Windows PowerShell)
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 🛣 Roadmap
- [ ] Download queue & prioritization
- [ ] Resume interrupted downloads
- [ ] Multi-language subtitle selection
- [ ] User authentication & rate limiting
- [ ] Custom output format selector (VP9/H.264 toggle)
- [ ] PWA installable experience
- [ ] Thumbnail + metadata export
- [ ] Analytics dashboard (self-hosted, opt-in)

---

## 🤝 Contributing
1. Fork the repo
2. Create a branch: `feature/<name>` or `bugfix/<name>`
3. Follow existing style (PEP 8 / ES6)
4. Test core flows (single video, playlist, cancel, mobile switch)
5. Open PR with clear description (include before/after behavior)

Commit convention examples:
```
feat: add download queue worker
fix: handle Windows file lock on cleanup
docs: improve API endpoint section
refactor: consolidate progress hook logic
```

---

## 📄 License & Legal Notice
Educational / personal use only. You are responsible for compliance with all applicable laws and platform terms. Do **not** use to distribute copyrighted material without permission.

---

## 🙏 Acknowledgments
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) – robust extraction backend
- [Flask](https://flask.palletsprojects.com/) – lightweight server framework
- Community UI inspiration from modern minimalist downloaders

---

## 🗓 Last Updated
October 27, 2025

**Made with ❤️ for learners, builders, and ethical use.**
