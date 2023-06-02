from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterUserView.as_view(), name='register'),
    path('email/verify/', views.VerifyEmail.as_view(), name='email-verify'),
    path('verify-otp/', views.VerifyOTPView.as_view(), name='verify-otp'),
    path('login-phone/', views.PhoneLoginView.as_view(), name='phoneLogin'),
    path('login-email/', views.EmailLoginView.as_view(), name='email_login'),
]