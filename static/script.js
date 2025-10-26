
// DOM Elements
const urlInput = document.getElementById('urlInput');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const spinner = submitBtn.querySelector('.spinner');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsContainer = document.getElementById('resultsContainer');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const toast = document.getElementById('toast');
const progressModal = document.getElementById('progressModal');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const cancelDownloadBtn = document.getElementById('cancelDownloadBtn');
const confirmDialog = document.getElementById('confirmDialog');
const confirmMessage = document.getElementById('confirmMessage');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Download state management
let currentDownloadAborted = false;
let currentDownloadController = null;
let currentFilename = null;
let currentVideoId = null;
let currentDownloadId = null;
let downloadRecovered = false; // Flag to indicate download was recovered from background

// API Base URL
const API_BASE = '';

// Confirmation Dialog
function showConfirmation(title, subtitle, yesText = 'Yes, Download', noText = 'Cancel') {
    return new Promise((resolve) => {
        confirmMessage.innerHTML = `<strong>${title}</strong><br><span style="font-size: 14px;">${subtitle}</span>`;
        confirmYes.textContent = yesText;
        confirmNo.textContent = noText;
        confirmDialog.classList.remove('hidden');
        
        const handleYes = () => {
            confirmDialog.classList.add('hidden');
            confirmYes.removeEventListener('click', handleYes);
            confirmNo.removeEventListener('click', handleNo);
            resolve(true);
        };
        
        const handleNo = () => {
            confirmDialog.classList.add('hidden');
            confirmYes.removeEventListener('click', handleYes);
            confirmNo.removeEventListener('click', handleNo);
            resolve(false);
        };
        
        confirmYes.addEventListener('click', handleYes);
        confirmNo.addEventListener('click', handleNo);
    });
}

// Cancel Download Handler
cancelDownloadBtn.addEventListener('click', async () => {
    const confirmed = await showConfirmation(
        'Cancel Download?', 
        'Downloaded files will be removed from server',
        'Yes, Cancel',
        'No, Continue'
    );
    if (!confirmed) return;
    
    currentDownloadAborted = true;
    
    // Cancel backend download process
    if (currentVideoId && currentDownloadId) {
        try {
            await fetch(`${API_BASE}/api/cancel-download/${encodeURIComponent(currentVideoId)}/${encodeURIComponent(currentDownloadId)}`, {
                method: 'POST'
            });
            console.log('Backend download cancellation requested');
        } catch (error) {
            console.error('Cancel request error:', error);
        }
    }
    
    // Abort frontend fetch
    if (currentDownloadController) {
        currentDownloadController.abort();
    }
    
    progressText.textContent = 'Cancelling and cleaning up...';
    cancelDownloadBtn.disabled = true;
    
    // Clean up server file if it exists
    if (currentFilename) {
        try {
            await fetch(`${API_BASE}/api/cleanup/${encodeURIComponent(currentFilename)}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Cleanup error:', error);
        }
    }
    
    progressModal.classList.add('hidden');
    cancelDownloadBtn.classList.add('hidden');
    cancelDownloadBtn.disabled = false;
    showToast('Download cancelled', 'error');
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// Session Management
function saveSession() {
    // Save current state to localStorage
    const sessionData = {
        url: urlInput.value.trim(),
        results: resultsContainer.innerHTML,
        hasResults: !resultsContainer.classList.contains('hidden'),
        timestamp: Date.now()
    };
    
    if (sessionData.url || sessionData.hasResults) {
        localStorage.setItem('ytDownloaderSession', JSON.stringify(sessionData));
    }
}

function restoreSession() {
    const savedSession = localStorage.getItem('ytDownloaderSession');
    
    if (!savedSession) return;
    
    try {
        const sessionData = JSON.parse(savedSession);
        
        // Only restore if session is less than 24 hours old
        const age = Date.now() - (sessionData.timestamp || 0);
        if (age > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('ytDownloaderSession');
            return;
        }
        
        // Don't restore if download is in progress
        if (!progressModal.classList.contains('hidden')) {
            return;
        }
        
        // Restore UI state
        if (sessionData.url) {
            urlInput.value = sessionData.url;
        }
        
        if (sessionData.hasResults && sessionData.results) {
            resultsContainer.innerHTML = sessionData.results;
            resultsContainer.classList.remove('hidden');
            
            // Re-attach event listeners to download buttons
            reattachDownloadListeners();
        }
    } catch (e) {
        console.error('Error restoring session:', e);
        localStorage.removeItem('ytDownloaderSession');
    }
}

// Page Visibility - Resume download check on mobile app switching
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
        // Page became visible - check if we have an active download
        if (currentVideoId && currentDownloadId && !progressModal.classList.contains('hidden')) {
            console.log('Page visible again, checking download status...');
            progressText.textContent = 'Checking download status...';
            
            // Keep checking until download is complete or error
            const maxRetries = 20; // Check for up to 1 minute
            let retries = 0;
            
            const checkInterval = setInterval(async () => {
                retries++;
                const result = await checkDownloadStatus();
                
                // Stop if download completed, errored, or max retries reached
                if (result === 'complete' || result === 'error' || retries >= maxRetries) {
                    clearInterval(checkInterval);
                    if (retries >= maxRetries && result === 'downloading') {
                        progressText.textContent = 'Download still in progress...';
                    }
                }
            }, 3000); // Check every 3 seconds
        }
    }
});

// Check download status (for mobile app switching recovery)
async function checkDownloadStatus() {
    if (!currentVideoId || !currentDownloadId) return 'error';
    
    try {
        const response = await fetch(`${API_BASE}/api/download-status/${encodeURIComponent(currentVideoId)}/${encodeURIComponent(currentDownloadId)}`);
        const data = await response.json();
        
        if (data.status === 'complete') {
            console.log('Download completed while app was in background!');
            
            // Set flag to indicate download was recovered
            downloadRecovered = true;
            
            // Process the completed download
            const downloadData = data.data;
            
            if (downloadData.warning) {
                showToast(downloadData.warning, 'warning', 4000);
            }
            
            progressBar.style.width = '80%';
            progressText.textContent = 'Transferring to your device...';
            
            // Download the file
            const filename = downloadData.filename;
            const originalTitle = downloadData.original_title || filename;
            const fileUrl = `${API_BASE}/api/get-file/${encodeURIComponent(filename)}`;
            
            const fileResponse = await fetch(fileUrl);
            if (!fileResponse.ok) throw new Error('Failed to download file');
            
            const blob = await fileResponse.blob();
            
            // Create proper filename
            const ext = filename.split('.').pop();
            let downloadFilename = filename;
            
            if (originalTitle && originalTitle !== filename) {
                const sanitizedTitle = originalTitle
                    .replace(/[<>:"/\\|?*]/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                downloadFilename = `${sanitizedTitle}.${ext}`;
            }
            
            // Trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = downloadFilename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            // Complete progress
            progressBar.style.width = '100%';
            progressText.textContent = 'Download complete! ✓';
            
            // Download subtitles if available
            if (downloadData.subtitles && downloadData.subtitles.length > 0) {
                for (const subFile of downloadData.subtitles) {
                    try {
                        const subUrl = `${API_BASE}/api/get-file/${encodeURIComponent(subFile)}`;
                        const subResponse = await fetch(subUrl);
                        if (subResponse.ok) {
                            const subBlob = await subResponse.blob();
                            const subDownloadUrl = window.URL.createObjectURL(subBlob);
                            const subLink = document.createElement('a');
                            subLink.style.display = 'none';
                            subLink.href = subDownloadUrl;
                            subLink.download = subFile;
                            document.body.appendChild(subLink);
                            subLink.click();
                            document.body.removeChild(subLink);
                            window.URL.revokeObjectURL(subDownloadUrl);
                        }
                    } catch (e) {
                        console.warn(`Failed to download subtitle ${subFile}:`, e);
                    }
                }
            }
            
            // Cleanup
            setTimeout(async () => {
                try {
                    await fetch(`${API_BASE}/api/cleanup/${encodeURIComponent(filename)}`, {
                        method: 'DELETE'
                    });
                } catch (e) {
                    console.warn('Cleanup error:', e);
                }
            }, 5000);
            
            setTimeout(() => {
                progressModal.classList.add('hidden');
                cancelDownloadBtn.classList.add('hidden');
                showToast('Download complete!', 'success');
                
                // Reset download state
                currentDownloadController = null;
                currentFilename = null;
                currentVideoId = null;
                currentDownloadId = null;
                currentDownloadAborted = false;
            }, 2000);
            
            return 'complete'; // Signal that download is complete
            
        } else if (data.status === 'error') {
            progressModal.classList.add('hidden');
            cancelDownloadBtn.classList.add('hidden');
            showToast('Download failed: ' + data.error, 'error');
            return 'error';
            
        } else if (data.status === 'cancelled') {
            progressModal.classList.add('hidden');
            cancelDownloadBtn.classList.add('hidden');
            showToast('Download was cancelled', 'error');
            return 'cancelled';
        }
        
        // If status is 'downloading', return that status
        return data.status || 'downloading';
        
    } catch (error) {
        console.error('Error checking download status:', error);
        // Don't show error toast - download might still be in progress
        return 'error';
    }
}

function reattachDownloadListeners() {
    // Find all download buttons and re-attach event listeners
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(btn => {
        // Remove any existing click listeners by cloning the button
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add the event listener to the new button
        newBtn.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            const title = this.dataset.title;
            handleDownloadFromSelect(videoId, title);
        });
    });
    
    console.log(`Reattached ${downloadButtons.length} download button listeners`);
}

// Event Listeners
submitBtn.addEventListener('click', handleSubmit);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSubmit();
});
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme on load
initTheme();

// Restore previous session on page load
window.addEventListener('DOMContentLoaded', restoreSession);

// Save session before page unload
window.addEventListener('beforeunload', saveSession);

// Utility Functions
function showToast(message, type = 'info', duration = 3000) {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, duration);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 3000);
}

function setLoading(loading) {
    if (loading) {
        submitBtn.disabled = true;
        btnText.textContent = 'Extracting...';
        spinner.classList.remove('hidden');
        loadingIndicator.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
    } else {
        submitBtn.disabled = false;
        btnText.textContent = 'Extract';
        spinner.classList.add('hidden');
        loadingIndicator.classList.add('hidden');
    }
}

function validateYouTubeUrl(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
}

function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return 'Size varies';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const formattedSize = Math.round(bytes / Math.pow(1024, i) * 100) / 100;
    return `~${formattedSize} ${sizes[i]}`;
}

function formatDuration(seconds) {
    if (!seconds) return 'Unknown';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Main Handler
async function handleSubmit() {
    const url = urlInput.value.trim();
    
    // Validation
    if (!url) {
        showError('Please enter a YouTube URL');
        return;
    }
    
    if (!validateYouTubeUrl(url)) {
        showError('Please enter a valid YouTube URL');
        return;
    }
    
    // Clear previous results
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    resultsContainer.innerHTML = '';
    
    setLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/api/extract`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to extract video information');
        }
        
        // Display results
        if (data.type === 'video') {
            displaySingleVideo(data.video);
            showSuccess('Video extracted successfully!');
        } else if (data.type === 'playlist') {
            displayPlaylist(data);
            showSuccess(`Playlist extracted successfully! ${data.videos.length} videos found.`);
        }
        
        resultsContainer.classList.remove('hidden');
        
        // Save session after successful extraction
        saveSession();
        
    } catch (error) {
        showError(error.message);
        showToast(error.message, 'error');
    } finally {
        setLoading(false);
    }
}

// Display Functions
function displaySingleVideo(video) {
    const videoCard = createVideoCard(video);
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(videoCard);
}

function displayPlaylist(data) {
    resultsContainer.innerHTML = '';
    
    // Playlist header
    const header = document.createElement('div');
    header.className = 'playlist-header';
    header.innerHTML = `
        <h2>${data.title}</h2>
        <p class="playlist-count">${data.videos.length} videos</p>
    `;
    resultsContainer.appendChild(header);
    
    // Video cards
    data.videos.forEach(video => {
        const videoCard = createVideoCard(video);
        resultsContainer.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    const thumbnail = video.thumbnail || 'https://via.placeholder.com/200x112?text=No+Thumbnail';
    const duration = formatDuration(video.duration);
    
    // Escape title for safe HTML attribute usage
    const escapedTitle = video.title.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    
    card.innerHTML = `
        <div class="video-content">
            <div class="video-thumbnail-container">
                <img src="${thumbnail}" alt="${escapedTitle}" class="video-thumbnail">
                <div class="video-duration">${duration}</div>
            </div>
            <div class="video-download-section">
                <h3 class="video-title">${video.title}</h3>
                <div class="download-controls">
                    <div style="flex: 1; min-width: 0;">
                        <label for="format-${video.id}" style="display: block; font-size: 13px; font-weight: 600; color: var(--text-dim); margin-bottom: 8px; padding-left: 4px;">
                            📹 Choose Quality & Format
                        </label>
                        <select class="format-select" id="format-${video.id}" aria-label="Select video quality">
                            <option value="" disabled selected>Select quality...</option>
                            ${createFormatOptions(video)}
                        </select>
                    </div>
                    <button class="btn btn-download" data-video-id="${video.id}" data-title="${escapedTitle}" style="align-self: flex-end;">
                        Download
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listener to button after it's in the DOM
    setTimeout(() => {
        const btn = card.querySelector('.btn-download');
        if (btn) {
            btn.addEventListener('click', () => {
                handleDownloadFromSelect(video.id, video.title);
            });
        }
    }, 0);
    
    return card;
}

function createFormatOptions(video) {
    if (!video.formats || video.formats.length === 0) {
        return '<option value="">No formats available</option>';
    }
    
    // Sort formats by quality (highest first)
    const sortedFormats = video.formats.sort((a, b) => {
        // Extract numeric quality for video formats
        const getQualityValue = (quality) => {
            if (quality.includes('Audio')) return -1; // Audio at the end
            const match = quality.match(/(\d+)p/);
            return match ? parseInt(match[1]) : 0;
        };
        
        return getQualityValue(b.quality) - getQualityValue(a.quality);
    });
    
    return sortedFormats.map(format => {
        const fileSize = formatFileSize(format.filesize);
        const isAudio = format.quality.includes('Audio');
        const icon = isAudio ? '🎵' : '🎬';
        const qualityDisplay = format.quality;
        
        return `<option value="${format.format_id}" data-ext="${format.ext}">${icon} ${qualityDisplay} - ${format.ext.toUpperCase()} (${fileSize})</option>`;
    }).join('');
}

// Download Handler
async function handleDownload(btnElement) {
    const btn = btnElement;
    const originalText = btn.textContent;
    
    // Get data from button attributes
    const videoId = btn.dataset.videoId;
    const formatId = btn.dataset.formatId;
    const title = btn.dataset.title;
    const ext = btn.dataset.ext;
    
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Starting...';
    
    // Show progress modal
    progressModal.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressText.textContent = 'Initializing download...';
    
    // Progress simulation function
    let currentProgress = 0;
    let progressInterval = null;
    
    const simulateProgress = (target, duration, message) => {
        return new Promise((resolve) => {
            if (progressInterval) clearInterval(progressInterval);
            
            const step = (target - currentProgress) / (duration / 100);
            progressText.textContent = message;
            
            progressInterval = setInterval(() => {
                currentProgress += step;
                if (currentProgress >= target) {
                    currentProgress = target;
                    progressBar.style.width = `${currentProgress}%`;
                    clearInterval(progressInterval);
                    resolve();
                } else {
                    progressBar.style.width = `${currentProgress}%`;
                }
            }, 100);
        });
    };
    
    try {
        // Initial progress
        await simulateProgress(10, 500, 'Connecting to server...');
        
        // Start the download request
        const downloadPromise = fetch(`${API_BASE}/api/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                video_id: videoId, 
                format_id: formatId,
                title: title
            }),
        });
        
        // Simulate progress while waiting for download
        const progressPromise = (async () => {
            await simulateProgress(25, 1000, 'Contacting YouTube servers...');
            await simulateProgress(50, 2000, 'Downloading from YouTube...');
        })();
        
        // Wait for download to complete
        const response = await downloadPromise;
        
        // Stop progress simulation
        if (progressInterval) clearInterval(progressInterval);
        currentProgress = 60;
        progressBar.style.width = '60%';
        progressText.textContent = 'Processing video...';
        
        const data = await response.json();
        
        if (!response.ok) {
            // Hide progress modal
            if (progressInterval) clearInterval(progressInterval);
            progressModal.classList.add('hidden');
            
            // Check if FFmpeg is required
            if (data.ffmpeg_required) {
                showToast('FFmpeg required for this quality. Please install FFmpeg or try a lower quality.', 'error', 5000);
            }
            throw new Error(data.error || 'Download failed');
        }
        
        // Show warning if present
        if (data.warning) {
            showToast(data.warning, 'warning', 4000);
        }
        
        // File is downloaded on server, now fetch it
        const filename = data.filename;
        
        await simulateProgress(70, 500, 'Preparing file transfer...');
        
        // Get the file from server with streaming and progress tracking
        const fileResponse = await fetch(`${API_BASE}/api/get-file/${encodeURIComponent(filename)}`);
        
        if (!fileResponse.ok) {
            if (progressInterval) clearInterval(progressInterval);
            progressModal.classList.add('hidden');
            throw new Error('Failed to retrieve file');
        }
        
        // Stream file with progress tracking
        const contentLength = fileResponse.headers.get('content-length');
        const total = parseInt(contentLength, 10);
        
        let loaded = 0;
        const reader = fileResponse.body.getReader();
        const chunks = [];
        
        // Stop progress simulation
        if (progressInterval) clearInterval(progressInterval);
        
        // Read stream with real progress
        while (true) {
            const {done, value} = await reader.read();
            
            if (done) break;
            
            chunks.push(value);
            loaded += value.length;
            
            // Update progress if we know total size
            if (total) {
                const percent = Math.min(70 + (loaded / total) * 25, 95);
                progressBar.style.width = `${percent}%`;
                const transferredMB = (loaded / 1024 / 1024).toFixed(1);
                const totalMB = (total / 1024 / 1024).toFixed(1);
                progressText.textContent = `Transferring: ${transferredMB}MB / ${totalMB}MB`;
            }
        }
        
        const blob = new Blob(chunks);
        
        await simulateProgress(98, 300, 'Finalizing download...');
        
        // Create download URL
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        
        // Complete progress
        if (progressInterval) clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressText.textContent = 'Download complete! ✓';
        
        // Delete file from server after download completes (longer delay for Windows file locking)
        setTimeout(async () => {
            try {
                await fetch(`${API_BASE}/api/cleanup/${encodeURIComponent(filename)}`, {
                    method: 'DELETE'
                });
                console.log('Server file cleaned up');
            } catch (e) {
                console.warn('Failed to cleanup server file:', e);
            }
        }, 5000);  // Increased to 5 seconds
        
        // Clean up
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            progressModal.classList.add('hidden');
        }, 1500);
        
        showToast('Download complete!', 'success');
        btn.innerHTML = '✓ Downloaded';
        
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = originalText;
        }, 2000);
        
    } catch (error) {
        console.error('Download error:', error);
        if (progressInterval) clearInterval(progressInterval);
        progressModal.classList.add('hidden');
        showToast(error.message, 'error');
        btn.disabled = false;
        btn.textContent = originalText;
    }
}

// Make handleDownload globally accessible
window.handleDownload = handleDownload;

// Download from dropdown handler
async function handleDownloadFromSelect(videoId, title) {
    const selectElement = document.getElementById(`format-${videoId}`);
    const formatId = selectElement.value;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const ext = selectedOption.getAttribute('data-ext');
    const quality = selectedOption.textContent;
    
    if (!formatId) {
        showToast('Please select a format', 'error');
        return;
    }
    
    // Show confirmation dialog
    const confirmed = await showConfirmation(`Download "${title}"?`, `Quality: ${quality}`);
    if (!confirmed) {
        return; // User cancelled
    }
    
    // Find the download button
    const btn = selectElement.closest('.download-controls').querySelector('.btn-download');
    const originalText = btn.textContent;
    
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Starting...';
    
    // Reset download state
    currentDownloadAborted = false;
    currentDownloadController = new AbortController();
    currentFilename = null;
    currentVideoId = videoId;
    downloadRecovered = false; // Reset recovery flag
    
    // Show progress modal with cancel button
    progressModal.classList.remove('hidden');
    cancelDownloadBtn.classList.remove('hidden');
    progressModal.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressText.textContent = 'Initializing download...';
    
    // Progress simulation function
    let currentProgress = 0;
    let progressInterval = null;
    
    const simulateProgress = (target, duration, message) => {
        return new Promise((resolve) => {
            if (progressInterval) clearInterval(progressInterval);
            
            const step = (target - currentProgress) / (duration / 100);
            progressText.textContent = message;
            
            progressInterval = setInterval(() => {
                currentProgress += step;
                if (currentProgress >= target) {
                    currentProgress = target;
                    progressBar.style.width = `${currentProgress}%`;
                    clearInterval(progressInterval);
                    resolve();
                } else {
                    progressBar.style.width = `${currentProgress}%`;
                }
            }, 100);
        });
    };
    
    // Start periodic status check (fallback for app switching)
    let statusCheckInterval = setInterval(async () => {
        if (currentVideoId && currentDownloadId && !currentDownloadAborted) {
            try {
                const response = await fetch(`${API_BASE}/api/download-status/${encodeURIComponent(currentVideoId)}/${encodeURIComponent(currentDownloadId)}`);
                const data = await response.json();
                
                if (data.status === 'complete') {
                    console.log('Status check: Download completed on server!');
                    clearInterval(statusCheckInterval);
                    // The download will be handled when fetch completes or by visibility handler
                }
            } catch (e) {
                // Ignore errors during periodic check
            }
        }
    }, 3000); // Check every 3 seconds
    
    try {
        // Initial progress
        await simulateProgress(10, 500, 'Connecting to server...');
        
        // Start the download request (without abort signal - let backend complete)
        const downloadPromise = fetch(`${API_BASE}/api/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                video_id: videoId, 
                format_id: formatId,
                title: title
            })
            // No signal - backend download continues even if frontend disconnects
        });
        
        // Simulate progress while waiting for download
        const progressPromise = (async () => {
            await simulateProgress(25, 1000, 'Contacting YouTube servers...');
            await simulateProgress(50, 2000, 'Downloading from YouTube...');
        })();
        
        // Wait for download to complete
        const response = await downloadPromise;
        
        // Stop progress simulation
        if (progressInterval) clearInterval(progressInterval);
        currentProgress = 60;
        progressBar.style.width = '60%';
        progressText.textContent = 'Processing video...';
        
        const data = await response.json();
        
        // Store download_id for cancellation
        if (data.download_id) {
            currentDownloadId = data.download_id;
        }
        
        // Check if download was cancelled
        if (data.cancelled) {
            console.log('Download was cancelled:', data.message);
            if (progressInterval) clearInterval(progressInterval);
            progressModal.classList.add('hidden');
            cancelDownloadBtn.classList.add('hidden');
            btn.disabled = false;
            btn.textContent = originalText;
            return; // Exit gracefully, toast already shown by cancel handler
        }
        
        if (!response.ok) {
            // Hide progress modal
            if (progressInterval) clearInterval(progressInterval);
            progressModal.classList.add('hidden');
            cancelDownloadBtn.classList.add('hidden');
            
            // Check if FFmpeg is required
            if (data.ffmpeg_required) {
                showToast('FFmpeg required for this quality. Please install FFmpeg or try a lower quality.', 'error', 5000);
            }
            throw new Error(data.error || 'Download failed');
        }
        
        // Show warning if present
        if (data.warning) {
            showToast(data.warning, 'warning', 4000);
        }
        
        await simulateProgress(80, 1000, 'Transferring to your device...');
        
        // Get the actual file with streaming support
        const filename = data.filename;
        currentFilename = filename; // Store for cancellation
        const originalTitle = data.original_title || filename;  // Use original title if available
        const fileUrl = `${API_BASE}/api/get-file/${encodeURIComponent(filename)}`;
        
        progressText.textContent = 'Connecting to server...';
        const fileResponse = await fetch(fileUrl);
        // No abort signal - if user switches apps, checkDownloadStatus will handle file download
        if (!fileResponse.ok) throw new Error('Failed to download file');
        
        // Check if we have content length for progress tracking
        const contentLength = fileResponse.headers.get('content-length');
        const total = parseInt(contentLength, 10);
        
        let loaded = 0;
        const reader = fileResponse.body.getReader();
        const chunks = [];
        let lastUpdateTime = Date.now();
        
        progressText.textContent = 'Downloading from server...';
        
        // Read stream with progress
        let consecutiveErrors = 0;
        const maxErrors = 3;
        
        while (true) {
            try {
                const {done, value} = await reader.read();
                
                if (done) break;
                
                chunks.push(value);
                loaded += value.length;
                consecutiveErrors = 0; // Reset error count on success
                
                // Update progress if we know total size (throttle updates to improve performance)
                const now = Date.now();
                if (total && (now - lastUpdateTime > 100)) {  // Update every 100ms max
                    lastUpdateTime = now;
                    const percent = Math.min(80 + (loaded / total) * 15, 95);
                    progressBar.style.width = `${percent}%`;
                    const transferredMB = (loaded / 1024 / 1024).toFixed(1);
                    const totalMB = (total / 1024 / 1024).toFixed(1);
                    const percentDone = ((loaded / total) * 100).toFixed(1);
                    progressText.textContent = `Downloading: ${transferredMB}MB / ${totalMB}MB (${percentDone}%)`;
                }
            } catch (streamError) {
                consecutiveErrors++;
                console.error(`Stream read error (${consecutiveErrors}/${maxErrors}):`, streamError);
                
                if (consecutiveErrors >= maxErrors) {
                    throw new Error(`Network interrupted after ${loaded} bytes. Please try again.`);
                }
                
                // Brief pause before retry
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        
        progressText.textContent = 'Preparing download...';
        
        // Combine chunks into blob
        const blob = new Blob(chunks);
        
        await simulateProgress(95, 500, 'Finalizing...');
        
        // Create proper filename from original title
        const ext = filename.split('.').pop(); // Get extension from server filename
        let downloadFilename = filename; // Default to server filename
        
        if (originalTitle && originalTitle !== filename) {
            // Sanitize title for use as filename (remove invalid characters)
            const sanitizedTitle = originalTitle
                .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
                .replace(/\s+/g, ' ') // Normalize whitespace
                .trim();
            downloadFilename = `${sanitizedTitle}.${ext}`;
        }
        
        // Trigger download with proper filename
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = downloadFilename; // Use original title-based filename
        document.body.appendChild(a);
        a.click();
        
        // Complete progress
        if (progressInterval) clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressText.textContent = 'Download complete! ✓';
        
        // Download subtitles if available
        if (data.subtitles && data.subtitles.length > 0) {
            console.log(`Found ${data.subtitles.length} subtitle file(s)`);
            for (const subFile of data.subtitles) {
                try {
                    const subUrl = `${API_BASE}/api/get-file/${encodeURIComponent(subFile)}`;
                    const subResponse = await fetch(subUrl);
                    if (subResponse.ok) {
                        const subBlob = await subResponse.blob();
                        const subDownloadUrl = window.URL.createObjectURL(subBlob);
                        const subLink = document.createElement('a');
                        subLink.style.display = 'none';
                        subLink.href = subDownloadUrl;
                        subLink.download = subFile;
                        document.body.appendChild(subLink);
                        subLink.click();
                        document.body.removeChild(subLink);
                        window.URL.revokeObjectURL(subDownloadUrl);
                        console.log(`Downloaded subtitle: ${subFile}`);
                    }
                } catch (e) {
                    console.warn(`Failed to download subtitle ${subFile}:`, e);
                }
            }
        }
        
        // Delete file from server after download completes (longer delay for Windows file locking)
        setTimeout(async () => {
            try {
                await fetch(`${API_BASE}/api/cleanup/${encodeURIComponent(filename)}`, {
                    method: 'DELETE'
                });
                console.log('Server file cleaned up');
                
                // Also cleanup subtitle files
                if (data.subtitles && data.subtitles.length > 0) {
                    for (const subFile of data.subtitles) {
                        await fetch(`${API_BASE}/api/cleanup/${encodeURIComponent(subFile)}`, {
                            method: 'DELETE'
                        });
                    }
                }
            } catch (e) {
                console.warn('Failed to cleanup server file:', e);
            }
        }, 5000);  // Increased to 5 seconds
        
        // Clean up
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            progressModal.classList.add('hidden');
            
            // Clear status check interval
            if (statusCheckInterval) clearInterval(statusCheckInterval);
        }, 1500);
        
        showToast('Download complete!', 'success');
        btn.innerHTML = '✓ Downloaded';
        
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = originalText;
        }, 2000);
        
    } catch (error) {
        console.error('Download error:', error);
        if (progressInterval) clearInterval(progressInterval);
        if (statusCheckInterval) clearInterval(statusCheckInterval);
        
        // If download was already recovered, don't show error
        if (downloadRecovered) {
            console.log('Download recovered successfully, ignoring fetch error');
            return;
        }
        
        // Handle cancellation differently
        if (error.name === 'AbortError' || currentDownloadAborted) {
            console.log('Download was cancelled by user');
            progressModal.classList.add('hidden');
            cancelDownloadBtn.classList.add('hidden');
            // Cleanup already handled by cancel button handler
        } else if (error.message && error.message.includes('Failed to fetch')) {
            // Fetch failed - possibly due to app switching
            // Don't show error immediately, wait and check status
            console.log('Fetch interrupted, checking download status...');
            progressText.textContent = 'Reconnecting...';
            
            // Wait then check status (give backend time to complete)
            setTimeout(async () => {
                await checkDownloadStatus();
                
                // If status check didn't find a completed download and wasn't recovered, show error
                if (!progressModal.classList.contains('hidden') && !downloadRecovered) {
                    progressModal.classList.add('hidden');
                    cancelDownloadBtn.classList.add('hidden');
                    showToast('Connection interrupted. Please try again.', 'error');
                    btn.disabled = false;
                    btn.textContent = originalText;
                }
            }, 5000); // Increased to 5 seconds to give backend more time
        } else {
            progressModal.classList.add('hidden');
            cancelDownloadBtn.classList.add('hidden');
            showToast(error.message, 'error');
        }
        
        btn.disabled = false;
        btn.textContent = originalText;
    }
}

// Make functions globally accessible
window.handleDownloadFromSelect = handleDownloadFromSelect;
