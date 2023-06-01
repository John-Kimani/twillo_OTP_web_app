from django.shortcuts import render, redirect
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response


from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import RegisterUserSerializer, VerifyOTPSerializer, PhoneLoginSerializer, EmailLoginSerializer
from .models import Profile
from .mixins import MessageHandler

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
                'success': 'User account created successfully',
                'data': {
                    'message': 'Verify your email to complete registration',
                    'username': user.username,
                    'email': user.email,
                    'phone_number': profile.phone_number
                }
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        response = {
            'success': 'Failed',
            'error': serializer.errors
        }
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    

class VerifyOTPView(generics.GenericAPIView):
    
    serializer_class = VerifyOTPSerializer

    @swagger_auto_schema(operation_summary='Verify OTP')
    def post(self, request:Request):

        data = request.data

        serializer = self.serializer_class(data=data)

        if serializer.is_valid(raise_exception=True):

            user_data = serializer._validated_data

            # serializer.save()

            otp = user_data['otp']
            try:
                MessageHandler.verify_token(phone_number='743538544', token=otp)
                response = {
                    'success': True,
                    'data': {
                        'message': 'OTP verification success'
                    }
                }
                return Response(data=response, status=status.HTTP_200_OK)
            except:
                return Response(data='An error occured', status=status.HTTP_400_BAD_REQUEST)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        


class PhoneLoginView(generics.GenericAPIView):

    serializer_class = PhoneLoginSerializer

    @swagger_auto_schema(operation_summary='Login with phone number')
    def post(self, request:Request):

        data = request.data

        phone_number = data['phone_number']

        user = Profile.objects.filter(phone_number=phone_number).first()

        if user is None:
            response = {
                'error': 'User not found'
            }

            return Response(data=response, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(data=data)

        if serializer.is_valid(raise_exception=True):

            user_data = serializer._validated_data

            phone_number = user_data['phone_number']

            MessageHandler(phone_number).send_otp_via_message()

            return Response(data=response, status=status.HTTP_200_OK)
        
class EmailLoginView(generics.GenericAPIView):

    serializer_class = EmailLoginSerializer

    def post(self, request:Request):

        data = request.data

        email = data['email']

        user = User.objects.filter(email=email).first()

        if user is None:
            response = {
                'error': 'User not found'
            }

            return Response(data=response, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():

            user_data = serializer._validated_data

            valid_email = user_data['email']

            otp = random.randint(1000, 9999)

            # send email

            response = {
                'data': {
                    'message': 'Proceed to verify OTP',
                    'OTP': otp,
                    'email': valid_email
                }
            }

            return Response(data=response, status=status.HTTP_200_OK)