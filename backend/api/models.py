from django.db import models

class UserSettings(models.Model):
    user_id = models.CharField(max_length=255, primary_key=True)
    language = models.CharField(max_length=10, default='en') # 'en' or 'hi'
    mode = models.CharField(max_length=10, default='text') # 'text' or 'voice'
    tts_provider = models.CharField(max_length=10, default='edge') # 'edge', 'google', or 'local'

    def __str__(self):
        return f"User {self.user_id} - lang:{self.language} mode:{self.mode} tts:{self.tts_provider}"
