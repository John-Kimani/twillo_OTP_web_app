from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response

from .serializers import RegisterUserSerializer

import random

def helloTwilio(request):
    return HttpResponse('Initial API')
class RegisterUserView(generics.GenericAPIView):
    
    serializer_class = RegisterUserSerializer

    def post(self, request:Request):

        data = request.data 

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():

            serializer.save()

            user_data = serializer.data 

            user = User.objects.get(username=user_data['username'])

            ## create jwt token
            # token = RefreshToken.for_user(user=user).access_token

            return Response(data='Works okay', status=status.HTTP_200_OK)

class VerifyOTP():
    pass