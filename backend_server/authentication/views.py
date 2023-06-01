from django.shortcuts import render, redirect
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.response import Response

import random

def helloTwilio(request):
    return HttpResponse('Initial API')
class Register():
    pass

class VerifyOTP():
    pass