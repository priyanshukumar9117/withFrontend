import os
import uuid
import tempfile
from gtts import gTTS
import pyttsx3

def generate_tts_google(text: str, language: str) -> str:
    """Generate TTS using Google gTTS and return file path."""
    # Fallback for Bhojpuri to Hindi for gTTS
    gtts_lang = 'hi' if language == 'bho' else language
    try:
        tts = gTTS(text=text, lang=gtts_lang, slow=False)
        temp_file = os.path.join(tempfile.gettempdir(), f"kisan_{uuid.uuid4()}.mp3")
        tts.save(temp_file)
        return temp_file
    except Exception as e:
        print(f"gTTS error: {e}")
        return ""

def generate_tts_local(text: str, language: str) -> str:
    """Generate TTS using local pyttsx3 offline."""
    # Note: pyttsx3 depends on system voices which might not fully support 'hi' natively.
    # We will just generate and return the best available voice mapping.
    engine = pyttsx3.init()
    temp_file = os.path.join(tempfile.gettempdir(), f"kisan_{uuid.uuid4()}.wav")
    engine.save_to_file(text, temp_file)
    engine.runAndWait()
    return temp_file

def generate_audio(text: str, language: str = 'en', provider: str = 'local') -> str:
    """Returns the path to the generated audio file."""
    if not text:
        return ""
        
    if provider == 'google':
        try:
            return generate_tts_google(text, language)
        except Exception as e:
            print(f"Error in Google TTS: {e}. Falling back to local TTS.")
            return generate_tts_local(text, language)
    else:
        return generate_tts_local(text, language)
