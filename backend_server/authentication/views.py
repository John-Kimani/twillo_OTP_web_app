from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings

from rest_framework import generics, status, views
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import RegisterUserSerializer, VerifyOTPSerializer, PhoneLoginSerializer, EmailLoginSerializer,EmailVerificationSerializer
from .models import Profile
from .mixins import MessageHandler
from .utils import Util

import jwt


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

            refresh = RefreshToken.for_user(user)

            current_site = get_current_site(request).domain

            relativeLink = reverse('email-verify')

            absurl = 'http://'+current_site+relativeLink+'?token='+str(refresh.access_token)

            email_body = f'Hello {user.username}, \n\nPlease use the link below to verify your email address for your account to be activated\n\n{absurl}'
            
            data = {
                'email_body': email_body,
                'to_email': user.email,
                'email_subject': 'Activate your Twillio oAuth by Kimperria account'
            }

            Util.send_email(data=data)

            response = {
                'success': True,
                'data': {
                    'message': 'Verify your email to complete registration',
                    'username': user.username,
                    'email': user.email,
                    'phone_number': profile.phone_number,
                    'token': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token)
                    }
                }
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        response = {
            'success': 'Failed',
            'error': serializer.errors
        }
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    
class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter('token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):

        token = request.GET.get('token')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

            user = User.objects.get(id=payload['user_id'])

            profile = Profile.objects.get(user=user)

            if not profile.is_verified:
                profile.is_verified = True
                profile.save()

            response = {
                'message': 'success',
                'email': 'Account successfully activated'
            }

            return Response(data=response, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError:
            response = {
                'error': 'Activation link expired'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError:
            response = {
                'error': 'Invalid token'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    

class VerifyOTPView(generics.GenericAPIView):
    
    serializer_class = VerifyOTPSerializer

    @swagger_auto_schema(operation_summary='Verify OTP')
    def post(self, request:Request):

        data = request.data
        user = request.user
        # print(user.id, user.profile.phone_number)
        if user.is_authenticated:
            phone_number = user.profile.phone_number

            serializer = self.serializer_class(data=data)

            if serializer.is_valid(raise_exception=True):

                user_data = serializer._validated_data

                # serializer.save()

                token = user_data['token']
                try:
                    MessageHandler(phone_number=phone_number).verify_SMS_token(token=token)

                    response = {
                        'success': True,
                        'data': {
                            'message': 'OTP verification success'
                        }
                    }
                    return Response(data=response, status=status.HTTP_200_OK)
                except:
                    return Response(data='Twillio: An error occured', status=status.HTTP_400_BAD_REQUEST)

            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {
                'success': False,
                'data': "Unauthorized"
            }
            return Response(data=response, status=status.HTTP_401_UNAUTHORIZED)



        



        


class PhoneLoginView(generics.GenericAPIView):

    serializer_class = PhoneLoginSerializer

    @swagger_auto_schema(operation_summary='Login with phone number')
    def post(self, request:Request):

        data = request.data

        phone_number = data['phone_number']

        profile = Profile.objects.filter(phone_number=phone_number).first()

        if profile is None:
            response = {
                'error': 'Profile not found'
            }
            return Response(data=response, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(data=data)

        if serializer.is_valid(raise_exception=True):

            user_data = serializer._validated_data

            phone_number = user_data['phone_number']

            profile_instance = Profile.objects.get(phone_number=phone_number)

            user = profile_instance.get_user()

            try:
                
                MessageHandler(phone_number).send_otp_via_message()

                refresh = RefreshToken.for_user(user)

                response = {
                    'success': True,
                    'data': {
                        'message': 'Proceed to verify OTP',
                        'user': user.username,
                        'auth_tokens': {
                            'refresh': str(refresh),
                            'access': str(refresh.access_token)
                        }
                    }
                }
                return Response(data=response, status=status.HTTP_200_OK)
            except:

                refresh = RefreshToken.for_user(user)
                response = {
                    'success': False,
                    'data': {
                        'message': 'Unable to send OTP',
                        'user': user.username,
                        'auth-tokens': {
                            'refresh': str(refresh),
                            'access': str(refresh.access_token)
                        }
                    }
                }
                return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
        response = {
            'success': 'Failed',
            'error': serializer.errors
        }
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
        
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

        if serializer.is_valid(raise_exception=True):

            user_data = serializer._validated_data

            refresh = RefreshToken.for_user(user)

            user_instance = User.objects.get(email=email)

            user_id = user_instance.pk

            profile = Profile.objects.get(user=user_id)
            phone_number = profile.phone_number
            try:
                # send both OTP on phone and magic link
                # MessageHandler(phone_number=phone_number).send_otp_via_message()

                valid_email = user_data['email']

                # send email with magic link
                refresh = RefreshToken.for_user(user)
                current_site = get_current_site(request).domain
                relativeLink = reverse('email-verify')


                absurl = 'http://'+current_site+relativeLink+'?token='+str(refresh.access_token)

                email_body = f'Hi {user.username}, \n\nClick on this magic link to login. \n\n{absurl}'
                
                data = {
                    'email_body': email_body,
                    'to_email': valid_email,
                    'email_subject': 'Login to Twilio oAuth by Kimperria'
                }

                Util.send_email(data=data)

                # verify email twilio

                response = {
                    'data': {
                        'message': 'Proceed to verify OTP',
                        'user': user.username,
                        'auth_tokens': {
                            'refresh': str(refresh),
                            'access': str(refresh.access_token)
                        }
                    }
                }

                return Response(data=response, status=status.HTTP_200_OK)
            
            except:
                response = {
                    'success': False,
                    'error': 'Unable to send OTP or Verify magic link'
                }
                return Response(data=response, status=status.HTTP_400_BAD_REQUEST)