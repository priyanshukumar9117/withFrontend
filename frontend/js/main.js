// Kisan_Setu AI - Main Script
import { LandingView } from './components/LandingView.js';
import { ChatView } from './components/ChatView.js';
import { DashboardView } from './components/DashboardView.js';
import { AboutView } from './components/AboutView.js';

const state = {
    currentView: 'landing',
    user: {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        language: 'en',
        mode: 'text'
    },
    recorder: null,
    audioChunks: [],
    currentAudio: null,
    currentAudioId: null,
    playbackRate: 1.0
};

const appRoot = document.getElementById('app-root');

if (window.marked) {
    window.marked.setOptions({
        gfm: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        headerIds: false
    });
}

// Router
function navigateTo(view) {
    state.currentView = view;
    render();
    window.scrollTo(0, 0);
}

// Global expose for onclick handlers
window.navigateTo = navigateTo;

function render() {
    let content = '';
    
    switch(state.currentView) {
        case 'landing':
            content = LandingView();
            break;
        case 'chat':
            content = ChatView();
            break;
        case 'dashboard':
            content = DashboardView();
            break;
        case 'about':
            content = AboutView();
            break;
        default:
            content = LandingView();
    }
    
    appRoot.innerHTML = content;
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    attachListeners();
}

function attachListeners() {
    if (state.currentView === 'chat') {
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const langToggle = document.getElementById('lang-toggle');
        const voiceModeToggle = document.getElementById('voice-mode-toggle');
        const voiceInputBtn = document.getElementById('voice-input-btn');
        const voiceStopBtn = document.getElementById('voice-stop-btn');
        const clearChatBtn = document.getElementById('clear-chat-btn');
        
        if (sendBtn && input) {
            sendBtn.onclick = () => handleSendMessage();
            input.onkeypress = (e) => {
                if (e.key === 'Enter') handleSendMessage();
            };
        }

        if (langToggle) {
            langToggle.value = state.user.language;
            langToggle.onchange = (e) => {
                state.user.language = e.target.value;
                appendMessage(`Language changed to ${e.target.options[e.target.selectedIndex].text}`, 'ai', true);
            };
        }

        if (voiceModeToggle) {
            voiceModeToggle.checked = state.user.mode === 'voice';
            voiceModeToggle.onchange = (e) => {
                state.user.mode = e.target.checked ? 'voice' : 'text';
                const status = state.user.mode === 'voice' ? 'Enabled' : 'Disabled';
                appendMessage(`Voice Response ${status}`, 'ai', true);
            };
        }

        if (voiceInputBtn) {
            voiceInputBtn.onclick = () => toggleRecording();
        }
        if (voiceStopBtn) {
            voiceStopBtn.onclick = () => stopVoicePlayback();
        }
        if (clearChatBtn) {
            clearChatBtn.onclick = () => clearChatHistory();
        }
    }
}

async function toggleRecording() {
    const btn = document.getElementById('voice-input-btn');
    if (!state.recorder || state.recorder.state === 'inactive') {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            state.recorder = new MediaRecorder(stream);
            state.audioChunks = [];

            state.recorder.ondataavailable = (e) => state.audioChunks.push(e.data);
            state.recorder.onstop = () => handleVoiceUpload();

            state.recorder.start();
            btn.classList.add('recording');
            btn.style.background = 'var(--error)';
            appendMessage("Listening... Speak now.", 'ai', true);
        } catch (err) {
            console.error("Mic access denied:", err);
            appendMessage("Error: Please allow microphone access.", 'ai');
        }
    } else {
        state.recorder.stop();
        btn.classList.remove('recording');
        btn.style.background = 'var(--primary)';
        removeMessageByText("Listening... Speak now.");
    }
}

async function handleVoiceUpload() {
    const audioBlob = new Blob(state.audioChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('user_id', state.user.id);
    formData.append('language', state.user.language);
    formData.append('mode', state.user.mode);

    const typingId = appendMessage('Processing voice...', 'ai', true);

    try {
        const response = await fetch('http://localhost:8000/query/', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        removeMessage(typingId);
        
        if (data.status === 'success') {
            appendMessage(data.query, 'user'); // Show transcribed text
            appendMessage(data.response_text, 'ai', false, data.audio_url);
        } else {
            appendMessage("Sorry, I couldn't understand that audio.", 'ai');
        }
    } catch (error) {
        removeMessage(typingId);
        appendMessage("Connection error. Ensure backend is running.", 'ai');
    }
}

function removeMessageByText(text) {
    const messages = document.querySelectorAll('.message');
    messages.forEach(m => {
        if (m.innerText === text) m.remove();
    });
}

async function handleSendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    
    appendMessage(message, 'user');
    input.value = '';
    
    const typingId = appendMessage('Thinking...', 'ai', true);
    
    try {
        const response = await fetch('http://localhost:8000/query/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: state.user.id,
                text: message,
                language: state.user.language,
                mode: state.user.mode
            })
        });
        
        const data = await response.json();
        removeMessage(typingId);
        
        if (data.status === 'success') {
            appendMessage(data.response_text, 'ai', false, data.audio_url);
        } else {
            appendMessage("Sorry, I'm having trouble connecting.", 'ai');
        }
    } catch (error) {
        removeMessage(typingId);
        appendMessage("Connection error. Ensure backend is running.", 'ai');
    }
}

function stopVoicePlayback() {
    if (state.currentAudio) {
        state.currentAudio.pause();
        state.currentAudio.currentTime = 0;
        
        // Update UI to show stopped state before resetting
        if (state.currentAudioId) {
            const playBtn = document.querySelector(`[data-audio-id="${state.currentAudioId}"] .audio-play-btn`);
            if (playBtn) {
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '▶';
            }
        }
        
        state.currentAudio = null;
        state.currentAudioId = null;
    }
    const stopBtn = document.getElementById('voice-stop-btn');
    if (stopBtn) stopBtn.style.display = 'none';
}

// Audio Control Functions
function createAudioControls(audioUrl, messageId) {
    if (!audioUrl) return '';
    
    const audioId = `audio_${messageId}`;
    return `
        <div class="audio-controls" data-audio-id="${audioId}">
            <button class="audio-btn audio-play-btn" onclick="window.playAudioMessage('${audioId}', '${audioUrl}')" title="Play audio">
                ▶
            </button>
            <div class="progress-container">
                <span class="time-display"><span class="current-time">0:00</span> / <span class="total-time">0:00</span></span>
                <input type="range" class="seek-slider" min="0" max="100" value="0" step="0.1" 
                       oninput="window.seekAudioBySlider('${audioId}', this.value)">
            </div>
            <div class="volume-control">
                <span style="font-size: 0.8rem;">🔊</span>
                <input type="range" class="volume-slider" min="0" max="100" value="100" 
                       onchange="window.changeVolume('${audioId}', this.value)">
            </div>
            <div class="speed-control">
                <button class="speed-btn" data-speed="0.75" onclick="window.changeSpeed('${audioId}', 0.75)">0.75x</button>
                <button class="speed-btn active" data-speed="1.0" onclick="window.changeSpeed('${audioId}', 1.0)">1x</button>
                <button class="speed-btn" data-speed="1.25" onclick="window.changeSpeed('${audioId}', 1.25)">1.25x</button>
                <button class="speed-btn" data-speed="1.5" onclick="window.changeSpeed('${audioId}', 1.5)">1.5x</button>
            </div>
            <button class="download-btn" onclick="window.downloadAudio('${audioUrl}')" title="Download audio">
                ⬇
            </button>
        </div>
    `;
}

// Global audio functions exposed to window
window.playAudioMessage = function(audioId, audioUrl) {
    const controls = document.querySelector(`[data-audio-id="${audioId}"]`);
    const playBtn = controls.querySelector('.audio-play-btn');
    
    if (state.currentAudioId === audioId && state.currentAudio && !state.currentAudio.paused) {
        // Pause current audio
        state.currentAudio.pause();
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '▶';
    } else {
        // Stop previous audio if any
        if (state.currentAudioId && state.currentAudioId !== audioId) {
            const prevPlayBtn = document.querySelector(`[data-audio-id="${state.currentAudioId}"] .audio-play-btn`);
            if (state.currentAudio) {
                state.currentAudio.pause();
            }
            if (prevPlayBtn) {
                prevPlayBtn.classList.remove('playing');
                prevPlayBtn.innerHTML = '▶';
            }
        }
        
        // Create or reuse audio element
        if (!state.currentAudio || state.currentAudioId !== audioId) {
            state.currentAudio = new Audio(audioUrl);
            state.currentAudio.playbackRate = state.playbackRate;
            
            state.currentAudio.onloadedmetadata = () => {
                updateAudioDuration(audioId, state.currentAudio.duration);
            };
            
            state.currentAudio.ontimeupdate = () => {
                updateAudioProgress(audioId, state.currentAudio);
            };
            
            state.currentAudio.onended = () => {
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '▶';
                controls.querySelector('.seek-slider').value = '0';
                controls.querySelector('.current-time').textContent = '0:00';
                state.currentAudio = null;
            };
            
            state.currentAudio.onerror = () => {
                console.error('Audio playback error');
                alert('Failed to play audio. Please check your connection.');
                // Reset UI on error
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '▶';
                state.currentAudio = null;
                state.currentAudioId = null;
            };
        }
        
        state.currentAudioId = audioId;
        state.currentAudio.play().catch(e => console.error('Audio play error:', e));
        playBtn.classList.add('playing');
        playBtn.innerHTML = '⏸';
    }
    
    const stopBtn = document.getElementById('voice-stop-btn');
    if (stopBtn && state.currentAudio && !state.currentAudio.paused) {
        stopBtn.style.display = 'inline-flex';
    }
};

window.seekAudio = function(event, audioId) {
    if (!state.currentAudio || state.currentAudioId !== audioId || !state.currentAudio.duration) return;
    
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const newTime = percent * state.currentAudio.duration;
    state.currentAudio.currentTime = Math.max(0, Math.min(newTime, state.currentAudio.duration));
};

window.seekAudioBySlider = function(audioId, value) {
    if (!state.currentAudio || state.currentAudioId !== audioId || !state.currentAudio.duration) return;
    
    const percent = parseFloat(value);
    const newTime = (percent / 100) * state.currentAudio.duration;
    state.currentAudio.currentTime = Math.max(0, Math.min(newTime, state.currentAudio.duration));
};

window.changeVolume = function(audioId, value) {
    if (!state.currentAudio || state.currentAudioId !== audioId) return;
    state.currentAudio.volume = parseInt(value) / 100;
};

window.changeSpeed = function(audioId, speed) {
    if (!state.currentAudio || state.currentAudioId !== audioId) return;
    state.playbackRate = parseFloat(speed);
    state.currentAudio.playbackRate = parseFloat(speed);
    
    // Update UI
    const controls = document.querySelector(`[data-audio-id="${audioId}"]`);
    controls.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active'));
    controls.querySelector(`.speed-btn[data-speed="${speed}"]`).classList.add('active');
};

window.downloadAudio = function(audioUrl) {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `kisan_audio_${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

function updateAudioDuration(audioId, duration) {
    const controls = document.querySelector(`[data-audio-id="${audioId}"]`);
    if (controls) {
        controls.querySelector('.total-time').textContent = formatTime(duration);
    }
}

function updateAudioProgress(audioId, audio) {
    const controls = document.querySelector(`[data-audio-id="${audioId}"]`);
    if (controls && audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        controls.querySelector('.seek-slider').value = percent;
        controls.querySelector('.current-time').textContent = formatTime(audio.currentTime);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function renderMarkdown(text, sender) {
    if (sender === 'ai' && window.marked) {
        try {
            return window.marked.parse(text, {
                gfm: true,
                breaks: true,
                smartLists: true,
                smartypants: true,
                headerIds: false
            });
        } catch (error) {
            console.warn('Markdown render failed:', error);
        }
    }
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function appendMessage(text, sender, isTemp = false, audioUrl = null) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const id = 'msg_' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = `message message-${sender}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.textContent = sender === 'ai' ? '🤖' : '👤';

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'message-body';

    const textSpan = document.createElement('span');
    textSpan.className = 'msg-text';
    textSpan.innerHTML = renderMarkdown(text, sender);
    bodyDiv.appendChild(textSpan);

    if (sender === 'ai' && audioUrl) {
        msgDiv.setAttribute('data-audio-url', audioUrl); // Store audio URL
        const audioControlsDiv = document.createElement('div');
        audioControlsDiv.innerHTML = createAudioControls(audioUrl, id);
        const controlsElement = audioControlsDiv.firstElementChild;
        if (controlsElement) {
            bodyDiv.appendChild(controlsElement);
        }
    }

    const metaSpan = document.createElement('span');
    metaSpan.className = 'msg-meta';
    metaSpan.innerHTML = sender === 'ai'
        ? `AI • <span class="msg-time">Now</span>`
        : `You • <span class="msg-time">Now</span>`;
    bodyDiv.appendChild(metaSpan);

    msgDiv.appendChild(avatarDiv);
    msgDiv.appendChild(bodyDiv);
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// Chat history persistence
function clearChatHistory() {
    if (confirm('Are you sure you want to clear all chat history?')) {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            // Add welcome message back
            const welcomeDiv = document.createElement('div');
            welcomeDiv.className = 'message message-ai';
            welcomeDiv.innerHTML = `
                <span class="msg-text">Namaste! I am your Kisan_Setu assistant. How can I help you today?</span>
                <span class="msg-meta">AI • <span class="msg-time">Now</span></span>
            `;
            chatMessages.appendChild(welcomeDiv);
        }
        localStorage.removeItem('chat_history_' + state.user.id);
        stopVoicePlayback();
    }
}

function saveChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    const messages = Array.from(chatMessages.children).map(m => {
        const audioUrl = m.getAttribute('data-audio-url') || null;
        return {
            text: m.querySelector('.msg-text')?.textContent || m.innerText,
            sender: m.classList.contains('message-user') ? 'user' : 'ai',
            audioUrl: audioUrl
        };
    });
    localStorage.setItem('chat_history_' + state.user.id, JSON.stringify(messages));
}

function loadChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    const saved = localStorage.getItem('chat_history_' + state.user.id);
    if (saved) {
        chatMessages.innerHTML = '';
        JSON.parse(saved).forEach(msg => {
            appendMessage(msg.text, msg.sender, false, msg.audioUrl);
        });
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    render();
});

// Save chat history on every message
const origAppendMessage = appendMessage;
appendMessage = function(text, sender, isTemp = false, audioUrl = null) {
    const id = origAppendMessage(text, sender, isTemp, audioUrl);
    if (!isTemp) {
        saveChatHistory();
    }
    return id;
};

// Load chat history after rendering chat view
const origRender = render;
render = function() {
    origRender();
    if (state.currentView === 'chat') {
        setTimeout(loadChatHistory, 0);
    }
};
