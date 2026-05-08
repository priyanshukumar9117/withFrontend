export const ChatView = () => `
    <div class="container">
        <div class="chat-panel">
            <div class="chat-header card-glow">
                <div class="chat-title-row">
                    <div class="chat-title-icon">
                        <i data-lucide="bot"></i>
                    </div>
                    <div class="chat-title-text">
                        <h2>Kisan_Setu AI</h2>
                        <p>Get fast farming guidance in English, Hindi, or Bhojpuri.</p>
                    </div>
                </div>
                <div class="chat-actions-row">
                    <div class="mode-toggle">
                        <span>Voice Mode</span>
                        <label class="switch">
                            <input type="checkbox" id="voice-mode-toggle">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="lang-selector">
                        <select id="lang-toggle">
                            <option value="en">English</option>
                            <option value="hi">Hindi (हिन्दी)</option>
                            <option value="bho">Bhojpuri (भोजपुरी)</option>
                        </select>
                    </div>
                    <button id="clear-chat-btn" class="btn btn-secondary">Clear Chat</button>
                </div>
            </div>

            <div id="chat-messages" class="chat-messages">
                <div class="message message-ai">
                    <div class="message-avatar">🤖</div>
                    <div class="message-body">
                        <span class="msg-text">Namaste! I am your Kisan_Setu assistant. How can I help you today?</span>
                        <span class="msg-meta">AI • <span class="msg-time">Now</span></span>
                    </div>
                </div>
            </div>

            <div id="speaking-indicator" class="speaking-indicator" style="display:none;">
                <span class="dot-flashing"></span>
                <span>AI is speaking...</span>
            </div>

            <div class="chat-input-area">
                <div class="chat-tool-group">
                    <button class="voice-btn" id="voice-input-btn" title="Speak to AI">
                        <i data-lucide="mic"></i>
                    </button>
                    <button class="voice-btn voice-stop-btn" id="voice-stop-btn" title="Stop Voice Response" style="display:none;">
                        <i data-lucide="square"></i>
                    </button>
                </div>
                <input type="text" id="chat-input" class="chat-input" placeholder="Ask about crops, weather, fertilizers...">
                <button id="send-btn" class="btn btn-primary send-btn" title="Send message">
                    <i data-lucide="send"></i>
                </button>
            </div>
        </div>
    </div>

    <style>
        .chat-panel {
            background: rgba(255, 255, 255, 0.98);
            border: 1px solid rgba(45, 90, 39, 0.12);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            padding: 24px;
            margin: 40px 0;
        }
        .chat-header {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 18px;
            padding: 22px;
            border-radius: calc(var(--radius-lg) - 4px);
            background: linear-gradient(135deg, rgba(212, 163, 115, 0.18), rgba(45, 90, 39, 0.08));
            border: 1px solid rgba(45, 90, 39, 0.08);
            margin-bottom: 18px;
        }
        .card-glow {
            backdrop-filter: blur(12px);
        }
        .chat-title-row {
            display: flex;
            align-items: center;
            gap: 14px;
            min-width: 240px;
        }
        .chat-title-icon {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            background: var(--primary);
            display: grid;
            place-items: center;
            color: white;
            box-shadow: 0 12px 24px rgba(45, 90, 39, 0.12);
        }
        .chat-title-icon i {
            width: 24px;
            height: 24px;
        }
        .chat-title-text h2 {
            font-size: 1.45rem;
            margin-bottom: 6px;
            color: var(--primary-dark);
        }
        .chat-title-text p {
            margin: 0;
            font-size: 0.95rem;
            color: var(--text-muted);
            line-height: 1.5;
        }
        .chat-actions-row {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .mode-toggle,
        .lang-selector {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: var(--radius-md);
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(45, 90, 39, 0.08);
            color: var(--text-main);
        }
        .mode-toggle span {
            font-size: 0.95rem;
            color: var(--primary-dark);
            font-weight: 600;
        }
        .lang-selector select {
            border: none;
            background: transparent;
            font-size: 0.95rem;
            color: var(--text-main);
            cursor: pointer;
            padding: 0;
            outline: none;
        }
        .lang-selector select option {
            color: var(--text-main);
        }
        .switch {
            position: relative;
            display: inline-block;
            width: 44px;
            height: 24px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(45, 90, 39, 0.18);
            border-radius: 34px;
            transition: 0.4s;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            border-radius: 50%;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
            transition: 0.4s;
        }
        .switch input:checked + .slider {
            background-color: var(--accent);
        }
        .switch input:checked + .slider:before {
            transform: translateX(20px);
        }
        .chat-messages {
            max-height: 58vh;
            overflow-y: auto;
            padding: 18px;
            background: linear-gradient(180deg, rgba(245, 248, 240, 0.95), rgba(255, 255, 255, 0.9));
            border-radius: var(--radius-lg);
            border: 1px solid rgba(45, 90, 39, 0.08);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
            scroll-behavior: smooth;
        }
        .chat-messages::-webkit-scrollbar {
            width: 10px;
        }
        .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(45, 90, 39, 0.18);
            border-radius: 999px;
        }
        .message {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 18px;
            padding: 16px;
            border-radius: 22px;
            max-width: 85%;
            position: relative;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .message:hover {
            transform: translateY(-1px);
            box-shadow: 0 12px 24px rgba(45, 90, 39, 0.08);
        }
        .message-user {
            margin-left: auto;
            background: linear-gradient(135deg, var(--primary-light), var(--primary));
            color: white;
            border-bottom-right-radius: 4px;
            flex-direction: row-reverse;
        }
        .message-ai {
            margin-right: auto;
            background: linear-gradient(135deg, rgba(212, 163, 115, 0.24), rgba(233, 213, 195, 0.95));
            color: var(--primary-dark);
            border-bottom-left-radius: 4px;
        }
        .message-avatar {
            width: 40px;
            height: 40px;
            min-width: 40px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            background: rgba(255, 255, 255, 0.7);
            box-shadow: 0 6px 14px rgba(45, 90, 39, 0.08);
            font-size: 1rem;
        }
        .message-body {
            display: flex;
            flex-direction: column;
            gap: 10px;
            min-width: 0;
        }
        .audio-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            width: 100%;
            padding: 12px 14px 10px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(45, 90, 39, 0.1);
            align-items: center;
            justify-content: flex-start;
        }
        .audio-controls > * {
            min-width: 0;
        }
        .audio-controls .progress-container {
            flex: 1 1 220px;
            min-width: 180px;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;
        }
        .audio-controls .seek-slider {
            flex: 1;
            height: 6px;
            border-radius: 3px;
            background: rgba(45, 90, 39, 0.2);
            outline: none;
            -webkit-appearance: none;
            cursor: pointer;
        }
        .audio-controls .seek-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--accent);
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .audio-controls .seek-slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--accent);
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .audio-controls .volume-control,
        .audio-controls .speed-control {
            min-width: 0;
        }
        .msg-text {
            font-size: 1rem;
            line-height: 1.6;
        }
        .msg-meta {
            align-self: flex-start;
            padding: 4px 10px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.7);
            font-size: 0.78rem;
            color: var(--text-muted);
        }
        .speaking-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 16px;
            margin: 16px 0 0;
            background: rgba(212, 163, 115, 0.15);
            border-radius: var(--radius-md);
            color: var(--primary-dark);
            font-size: 0.95rem;
            border: 1px solid rgba(212, 163, 115, 0.3);
        }
        .chat-input-area {
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: 12px;
            align-items: center;
            margin-top: 22px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: var(--radius-lg);
            padding: 12px 16px;
            border: 1px solid rgba(45, 90, 39, 0.12);
            box-shadow: var(--shadow-sm);
        }
        .chat-tool-group {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .voice-btn {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: var(--surface);
            color: var(--primary);
            display: grid;
            place-items: center;
            border: 1px solid rgba(45, 90, 39, 0.12);
            box-shadow: 0 10px 20px rgba(45, 90, 39, 0.08);
            transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }
        .voice-btn:hover {
            transform: translateY(-2px);
            background: var(--primary);
            color: white;
        }
        .voice-stop-btn {
            background: var(--error);
            color: white;
            border-color: transparent;
        }
        .voice-stop-btn:hover {
            background: #c32f2f;
        }
        .chat-input {
            width: 100%;
            min-height: 52px;
            border-radius: 999px;
            border: 1px solid rgba(45, 90, 39, 0.14);
            padding: 16px 20px;
            font-size: 1rem;
            color: var(--text-main);
            outline: none;
            background: rgba(245, 248, 240, 0.95);
        }
        .chat-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(45, 90, 39, 0.08);
        }
        .send-btn {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            padding: 0;
        }
        .send-btn i {
            width: 20px;
            height: 20px;
        }
        .btn-secondary {
            background: rgba(45, 90, 39, 0.08);
            color: var(--primary-dark);
            border: 1px solid rgba(45, 90, 39, 0.12);
            box-shadow: none;
            padding: 12px 18px;
            border-radius: var(--radius-md);
        }
        .btn-secondary:hover {
            background: rgba(45, 90, 39, 0.14);
            transform: translateY(-1px);
        }
        @media (max-width: 820px) {
            .chat-header {
                flex-direction: column;
                align-items: stretch;
            }
            .chat-actions-row {
                justify-content: flex-start;
                width: 100%;
            }
            .chat-input-area {
                grid-template-columns: 1fr;
            }
            .chat-tool-group {
                justify-content: flex-start;
            }
            .send-btn {
                width: 100%;
                border-radius: var(--radius-md);
                height: 52px;
            }
        }
        @media (max-width: 560px) {
            .chat-panel {
                padding: 18px;
            }
            .chat-title-icon {
                width: 44px;
                height: 44px;
            }
            .message {
                padding: 14px;
            }
            .chat-input {
                padding: 14px 18px;
            }
        }
    </style>
`;
