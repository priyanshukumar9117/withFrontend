# Kisan_Mitra - AI-Powered Agricultural Assistant for Bihar Farmers 🌾

Kisan_Mitra is a comprehensive, production-ready Telegram chatbot designed to assist farmers in Bihar, India. It uses a local Ollama LLM for intelligence, ChromaDB for RAG (Retrieval-Augmented Generation), Whisper for speech recognition, and pyttsx3/Google TTS for voice synthesis.

## ✨ Features
- **Multimodal Interaction**: Supports both text and voice queries (English, Hindi, and Bhojpuri).
- **Bihar-Specific Advice**: Provides answers based on Bihar's soil, climate, irrigation, and government schemes.
- **RAG Integration**: Provides accurate answers by searching agricultural PDFs/documents.
- **Privacy First**: Designed for local execution (Ollama, Whisper, and ChromaDB run on your machine).
- **Customizable**: Adjustable response modes, languages, and TTS providers.

---

## 🚀 Pre-requisites
Ensure you have the following installed on your Mac:
1. **Python 3.9+**
2. **[Ollama](https://ollama.ai/)**
3. **Telegram Bot Token** from [@BotFather](https://t.me/botfather).
4. **Hugging Face Token** (Optional but recommended for model downloads).

### Local Model Setup
Ensure you have the required Ollama model:
```bash
ollama run llama3.2:1b
```

---

## 🛠️ Installation & Setup

### 1. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your keys:
```bash
TELEGRAM_BOT_TOKEN=your_bot_token
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:1b
DJANGO_SECRET_KEY=generate_a_secure_key
HF_TOKEN=your_huggingface_token
```

### 2. Setup Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Build the RAG Knowledge Base
Place your agricultural PDFs, Markdown files, CSVs, or plain text files in the `data/` folder, then run:
```bash
python3 build_rag.py --reset
```
This generates the `chroma_db` vector database locally.

### 4. Run the Backend (Django)
Open a terminal, activate your `venv`, and start the core API:
```bash
cd backend
python3 manage.py makemigrations api
python3 manage.py migrate
python3 manage.py runserver
```

### 5. Run the Telegram Bot
Open a **second** terminal, activate `venv`, and start the bot:
```bash
export BACKEND_URL="http://localhost:8000"
python3 telegram_bot/bot.py
```

---

## 📱 Bot Commands
- `/start` - Launch the assistant.
- `/language [en|hi]` - Switch between English and Hindi.
- `/mode [text|voice]` - Toggle between text-only and voice (+text) responses.
- `/tts [local|google]` - Choose between offline TTS or Google Cloud TTS.

---

## 🤖 Ollama Models

### Supported Models
- **llama3.2:1b** (Default) - Fast, low memory, good for English
- **llama2:7b** - Better multilingual, requires more RAM
- **mistral** - Excellent quality, good multilingual support
- **qwen:4b** - Great for Hindi/Bhojpuri support (⚠️ Not `qwen3:4b`)

⚠️ **Note**: Model name `qwen3:4b` does not exist in Ollama. Use `qwen:4b` instead.

For complete model compatibility details, troubleshooting, and performance comparisons, see [MODEL_COMPATIBILITY.md](MODEL_COMPATIBILITY.md).

---

## 📁 Project Structure
- `backend/`: Django REST API core.
- `telegram_bot/`: Polling service for Telegram interaction.
- `rag/`, `stt/`, `tts/`, `llm/`: Modular logic for Retrieval, Speech-to-Text, Text-to-Speech, and AI Generation.
- `data/`: Your source agricultural documents.
