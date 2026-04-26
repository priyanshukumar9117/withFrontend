from django.urls import path
from . import views

urlpatterns = [
    path('query/', views.query_bot, name='query_bot'),
    path('set-language/', views.set_language, name='set_language'),
    path('set-mode/', views.set_mode, name='set_mode'),
    path('set-tts/', views.set_tts, name='set_tts'),
]
