from django.urls import path
from . import views

urlpatterns = [
    path('', views.helloTwilio, name='test'),
    # path('register/', views.Register.as_view(), name='register'),
    # path('otp/<str:uid>,', views.VerifyOTP.as_view(), name='otp')
]