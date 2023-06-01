from django.db import models
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    phone_number = models.CharField(max_length=20)
    otp = models.CharField(max_length=100, null=True, blank=True)
    uid = models.CharField(max_length=200, default=f'{uuid.uuid4}')

    def __str__(self):
        return self.user.username
