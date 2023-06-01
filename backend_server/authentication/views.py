from django.shortcuts import render, redirect
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import RegisterUserSerializer
from .models import Profile

import random



class RegisterUserView(generics.GenericAPIView):
    
    serializer_class = RegisterUserSerializer

    @swagger_auto_schema(operation_summary='Create new user account and assign profile')
    def post(self, request:Request):

        data = request.data 

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():

            serializer.save()

            user_data = serializer.data 

            user = User.objects.get(username=user_data['username'])

            ## create jwt token
            token = RefreshToken.for_user(user=user).access_token

            response = {
                'message': 'Profile created successfully',
                'data': {
                    'message': 'Verify your email to complete registration',
                    'username': user.username
                }
            }

            return Response(data=response, status=status.HTTP_201_CREATED)

class VerifyOTP():
    pass