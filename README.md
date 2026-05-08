# Kisan_Setu AI - Smart Agricultural Assistant for Farmers 🌾

**Kisan_Setu AI** is a professional, multimodal AI assistant designed to empower farmers with instant, localized agricultural guidance. It provides expert advice on crops, fertilizers, weather, and market prices in **English, Hindi, and Bhojpuri**.

---

## 🚀 Features
- **Multimodal Interface**: Interactive web dashboard and WhatsApp-style chat interface.
- **Voice Mode**: Listen to AI responses in your local language (Perfect for low digital literacy).
- **Localized Wisdom**: Specifically tuned for Bihar's soil, climate, and government schemes.
- **RAG Powered**: Real-time retrieval of agricultural knowledge from expert documents and Mandi prices.
- **Multilingual**: Speak or type in **English, Hindi, or Bhojpuri**.
- **Privacy First**: Designed to run locally with **Ollama** and **ChromaDB**.

---

## 🛠️ Tech Stack
- **Frontend**: Vanilla JS (ES Modules), Modern CSS, Lucide Icons.
- **Backend**: Django REST Framework, Python.
- **AI/ML**: Ollama (Llama 3.2), Whisper (STT), gTTS/pyttsx3 (TTS).
- **Database**: ChromaDB (Vector Search), SQLite.

---

## 📋 Pre-requisites
- **Python 3.9+**
- **Ollama** (Install from [ollama.com](https://ollama.com))
- **Active Internet Connection** (for Google TTS and initial model downloads)

---

## 🚦 Getting Started (Step-by-Step)

### 1. Clone & Setup Environment
```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Ollama
Ensure Ollama is running and download the model:
```bash
ollama run llama3.2:1b
```

### 3. Initialize the Knowledge Base (RAG)
Add your agricultural PDFs/Docs to the `data/` folder and build the index:
```bash
python3 build_rag.py --reset
```

### 4. Start the Backend (Django)
Open a new terminal and run:
```bash
cd backend
python3 manage.py makemigrations api
python3 manage.py migrate
python3 manage.py runserver
```
The API will be available at `http://localhost:8000`.

### 5. Start the Modern Web App
Open another terminal and run the startup script:
```bash
./start_frontend.sh
```
Visit **`http://localhost:3000`** in your browser to experience the new Kisan_Setu AI.

---

## 📱 How to Use
1.  **Ask AI**: Go to the "Ask AI" tab.
2.  **Choose Language**: Select English, Hindi, or Bhojpuri.
3.  **Voice Mode**: Toggle "Voice Mode" to hear the AI speak the answer.
4.  **Dashboard**: Check the "Dashboard" for real-time Mandi prices and weather alerts.

---

## 📁 Project Structure
- `frontend/`: Modern SPA web application (Vanilla JS).
- `backend/`: Django API core and project settings.
- `data/`: Source agricultural datasets and PDFs.
- `chroma_db/`: Vector database storage.
- `start_frontend.sh`: Convenience script for the web UI.

---

## 🤝 Contribution
Created with ❤️ for the farming community. For team details, visit the **About** section in the app.
