export const ChatView = () => `
    <div class="container">
        <div class="chat-container">
            <div class="chat-header">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i data-lucide="bot"></i>
                    <div>
                        <div style="font-weight: 600;">Kisan_Setu AI</div>
                        <div style="font-size: 0.75rem; opacity: 0.8;">Online | Smart Assistant</div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="mode-toggle" style="display: flex; align-items: center; gap: 5px; font-size: 0.8rem;">
                        <span>Voice Mode</span>
                        <label class="switch" style="position: relative; display: inline-block; width: 40px; height: 20px;">
                            <input type="checkbox" id="voice-mode-toggle" style="opacity: 0; width: 0; height: 0;">
                            <span class="slider round" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.3); transition: .4s; border-radius: 20px;"></span>
                        </label>
                    </div>
                    <div class="lang-selector">
                        <select id="lang-toggle" style="background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 5px; border-radius: 5px; cursor: pointer;">
                            <option value="en" style="color: #333;">English</option>
                            <option value="hi" style="color: #333;">Hindi (हिन्दी)</option>
                            <option value="bho" style="color: #333;">Bhojpuri (भोजपुरी)</option>
                        </select>
                    </div>
                    <button id="clear-chat-btn" class="btn btn-secondary" style="margin-left: 10px;">Clear Chat</button>
                </div>
            </div>
            
            <div id="chat-messages" class="chat-messages">
                <div class="message message-ai">
                    <span class="msg-text">Namaste! I am your Kisan_Setu assistant. How can I help you today?</span>
                    <span class="msg-meta">AI • <span class="msg-time">Now</span></span>
                </div>
            </div>
            <div id="speaking-indicator" style="display:none; text-align:center; margin:10px 0;">
                <span class="dot-flashing"></span> <span style="font-size:0.9em; color:var(--accent)">AI is speaking...</span>
            </div>
            
            <div class="chat-input-area">
                <button class="voice-btn" id="voice-input-btn" title="Speak to AI">
                    <i data-lucide="mic"></i>
                </button>
                <button class="voice-btn" id="voice-stop-btn" title="Stop Voice Response" style="display:none; margin-left: 10px; background: var(--error);">
                    <i data-lucide="square"></i>
                </button>
                <input type="text" id="chat-input" class="chat-input" placeholder="Ask about crops, weather, fertilizers...">
                <button id="send-btn" class="btn btn-primary" style="padding: 10px 20px;">
                    <i data-lucide="send"></i>
                </button>
            </div>
        </div>
    </div>
    
    <style>
        .switch input:checked + .slider { background-color: var(--accent); }
        .switch input:checked + .slider:before { transform: translateX(20px); }
        .slider:before {
            position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px;
            background-color: white; transition: .4s; border-radius: 50%;
        }
        .voice-btn {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
            border: none;
            cursor: pointer;
        }
        .btn-secondary {
            background: var(--accent-light);
            color: var(--primary);
            border-radius: var(--radius-md);
            padding: 8px 16px;
            border: none;
        }
        .chat-messages {
            max-height: 60vh;
            overflow-y: auto;
            padding: 20px 0;
            background: var(--surface);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
        }
        .message {
            margin-bottom: 18px;
            padding: 12px 18px;
            border-radius: var(--radius-md);
            max-width: 80%;
            position: relative;
            word-break: break-word;
        }
        .message-user {
            background: var(--primary-light);
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 0;
        }
        .message-ai {
            background: var(--accent-light);
            color: var(--primary-dark);
            margin-right: auto;
            border-bottom-left-radius: 0;
        }
        .msg-meta {
            display: block;
            font-size: 0.75em;
            color: var(--text-muted);
            margin-top: 4px;
        }
        /* Speaking indicator animation */
        .dot-flashing {
            position: relative;
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background-color: var(--accent);
            color: var(--accent);
            animation: dotFlashing 1s infinite linear alternate;
        }
        @keyframes dotFlashing {
            0% { opacity: 1; }
            100% { opacity: 0.2; }
        }
        /* Audio Controls Styling */
        .audio-controls {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: var(--radius-md);
            flex-wrap: wrap;
        }
        .audio-btn {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            transition: var(--transition);
            font-size: 0.9rem;
        }
        .audio-btn:hover {
            background: var(--primary-dark);
            transform: scale(1.1);
        }
        .audio-btn:active {
            transform: scale(0.95);
        }
        .audio-btn.playing {
            background: var(--accent);
            animation: pulse-btn 0.6s infinite;
        }
        @keyframes pulse-btn {
            0%, 100% { box-shadow: 0 0 0 0 rgba(212, 163, 115, 0.7); }
            50% { box-shadow: 0 0 0 8px rgba(212, 163, 115, 0); }
        }
        .progress-container {
            flex: 1;
            min-width: 150px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .time-display {
            font-size: 0.75rem;
            color: var(--text-muted);
            min-width: 40px;
            text-align: center;
            font-weight: 500;
        }
        .progress-bar {
            flex: 1;
            height: 4px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 2px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: var(--primary);
            border-radius: 2px;
            transition: width 0.1s linear;
            position: relative;
        }
        .progress-fill::after {
            content: '';
            position: absolute;
            right: -4px;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            background: var(--primary);
            border-radius: 50%;
            box-shadow: 0 0 4px rgba(45, 90, 39, 0.5);
        }
        .volume-control {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .volume-slider {
            width: 60px;
            height: 4px;
            cursor: pointer;
        }
        .speed-control {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.75rem;
        }
        .speed-btn {
            padding: 3px 6px;
            background: var(--accent-light);
            color: var(--primary-dark);
            border: 1px solid var(--primary);
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.7rem;
            font-weight: 600;
            transition: var(--transition);
        }
        .speed-btn:hover, .speed-btn.active {
            background: var(--accent);
            color: white;
        }
        .download-btn {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            background: var(--accent);
            color: var(--primary-dark);
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            transition: var(--transition);
            font-size: 0.9rem;
        }
        .download-btn:hover {
            background: var(--primary);
            color: white;
        }
        .audio-loading {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-muted);
            font-size: 0.85rem;
        }
        .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(45, 90, 39, 0.2);
            border-top: 2px solid var(--primary);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
            .chat-container { padding: 0 2vw; }
            .chat-messages { max-height: 50vh; }
            .chat-input-area { flex-direction: column; gap: 10px; }
            .audio-controls {
                gap: 8px;
                padding: 8px;
            }
            .progress-container {
                min-width: 120px;
            }
            .audio-btn {
                width: 28px;
                height: 28px;
                font-size: 0.8rem;
            }
        }
    </style>
`;
