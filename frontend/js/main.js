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
    audioChunks: []
};

const appRoot = document.getElementById('app-root');

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
            appendMessage(data.response_text, 'ai');
            if (data.audio_url) {
                playAudio(data.audio_url);
            }
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
            appendMessage(data.response_text, 'ai');
            if (data.audio_url) {
                playAudio(data.audio_url);
            }
        } else {
            appendMessage("Sorry, I'm having trouble connecting.", 'ai');
        }
    } catch (error) {
        removeMessage(typingId);
        appendMessage("Connection error. Ensure backend is running.", 'ai');
    }
}

let currentAudio = null;
function playAudio(url) {
    stopVoicePlayback();
    currentAudio = new Audio(url);
    const stopBtn = document.getElementById('voice-stop-btn');
    if (stopBtn) stopBtn.style.display = 'inline-flex';
    currentAudio.onended = () => {
        if (stopBtn) stopBtn.style.display = 'none';
        currentAudio = null;
    };
    currentAudio.play().catch(e => {
        if (stopBtn) stopBtn.style.display = 'none';
        console.error("Audio playback failed:", e);
    });
}

function stopVoicePlayback() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    const stopBtn = document.getElementById('voice-stop-btn');
    if (stopBtn) stopBtn.style.display = 'none';
}

function appendMessage(text, sender, isTemp = false) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const id = 'msg_' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = `message message-${sender}`;
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// Chat history persistence
function saveChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    const messages = Array.from(chatMessages.children).map(m => ({
        text: m.innerText,
        sender: m.classList.contains('message-user') ? 'user' : 'ai'
    }));
    localStorage.setItem('chat_history_' + state.user.id, JSON.stringify(messages));
}

function loadChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    const saved = localStorage.getItem('chat_history_' + state.user.id);
    if (saved) {
        chatMessages.innerHTML = '';
        JSON.parse(saved).forEach(msg => {
            appendMessage(msg.text, msg.sender);
        });
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    render();
});

// Save chat history on every message
const origAppendMessage = appendMessage;
appendMessage = function(text, sender, isTemp = false) {
    const id = origAppendMessage(text, sender, isTemp);
    saveChatHistory();
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
