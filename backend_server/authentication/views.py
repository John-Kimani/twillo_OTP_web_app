from django.shortcuts import render, redirect
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response

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

        if serializer.is_valid(raise_exception=True):

            user_data = serializer._validated_data 

            serializer.save()

            user = User.objects.get(username=user_data['username'])

            phone_number = user_data['phone_number']

            profile = Profile.objects.create(user=user, phone_number=phone_number)

            response = {
                'message': 'User account created successfully',
                'data': {
                    'message': 'Verify your email to complete registration',
                    'username': user.username
                }
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTP():
    pass