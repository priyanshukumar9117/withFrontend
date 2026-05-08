import os
import tempfile
import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserSettings
from llm.generator import generate_response
from rag.retriever import retrieve_context
from stt.transcriber import transcribe_audio
from tts.speaker import generate_audio
from django.conf import settings

@api_view(['POST'])
def set_language(request):
    user_id = request.data.get('user_id')
    language = request.data.get('language', 'en')
    if not user_id:
        return Response({"error": "user_id is required"}, status=400)
    user, _ = UserSettings.objects.get_or_create(user_id=user_id)
    user.language = language
    user.save()
    return Response({"status": "success", "language": language})

@api_view(['POST'])
def set_mode(request):
    user_id = request.data.get('user_id')
    mode = request.data.get('mode', 'text')
    if not user_id:
        return Response({"error": "user_id is required"}, status=400)
    user, _ = UserSettings.objects.get_or_create(user_id=user_id)
    user.mode = mode
    user.save()
    return Response({"status": "success", "mode": mode})

@api_view(['POST'])
def set_tts(request):
    user_id = request.data.get('user_id')
    tts_provider = request.data.get('tts_provider', 'local')
    if not user_id:
        return Response({"error": "user_id is required"}, status=400)
    user, _ = UserSettings.objects.get_or_create(user_id=user_id)
    user.tts_provider = tts_provider
    user.save()
    return Response({"status": "success", "tts_provider": tts_provider})

@api_view(['POST'])
def query_bot(request):
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({"error": "user_id is required"}, status=400)
        
    user, _ = UserSettings.objects.get_or_create(user_id=user_id)
    
    # Update language and mode if provided in the request
    if 'language' in request.data:
        user.language = request.data.get('language')
        user.save()
    if 'mode' in request.data:
        user.mode = request.data.get('mode')
        user.save()

    text = request.data.get('text', '')
    audio_file = request.FILES.get('audio') # if user sends voice
    
    # Process audio if sent
    if audio_file:
        temp_audio_path = os.path.join(tempfile.gettempdir(), f"upload_{uuid.uuid4()}.oga")
        with open(temp_audio_path, 'wb+') as destination:
            for chunk in audio_file.chunks():
                destination.write(chunk)
                
        transcribed_text = transcribe_audio(temp_audio_path)
        if transcribed_text:
            text = transcribed_text
            
    if not text:
        return Response({"error": "No text or invalid audio provided."}, status=400)
        
    # 1. Retrieve RAG Document Context
    context = retrieve_context(text, k=3)
    
    # 2. LLM inference via Ollama
    response_text = generate_response(text, context, language=user.language)
    
    # 3. Generate voice if Voice Mode is active
    audio_url = ""
    if user.mode == 'voice' or audio_file:
        audio_filename = generate_audio(
            response_text, 
            language=user.language, 
            provider=user.tts_provider
        )
        if audio_filename:
            # Construct absolute URL for the audio file
            filename = os.path.basename(audio_filename)
            audio_url = request.build_absolute_uri(settings.MEDIA_URL + filename)
        
    return Response({
        "status": "success",
        "query": text,
        "response_text": response_text,
        "audio_url": audio_url,
        "language": user.language,
        "mode": user.mode
    })
