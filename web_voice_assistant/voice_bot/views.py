import os

import speech_recognition as sr
from django.http import JsonResponse
from django.shortcuts import render
from speech_recognition import UnknownValueError


from .models import Command, Bot

def home(request):

    return render(request, 'index.html')

def experiment1(request):
    return render(request, 'experiment1.html')

def experiment2(request):
    return render(request, 'experiment2.html')

def experiment3(request):
    return render(request, 'experiment3.html')

def experiment4(request):
    return render(request, 'experiment4.html')

def experiment5(request):
    return render(request, 'experiment5.html')

