from django.db import models
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_profile')
    phone_number = models.CharField(max_length=20)
    otp = models.CharField(max_length=100, null=True, blank=True)
    token = models.CharField(max_length=100, null=True, blank=True)
    uid = models.UUIDField(default=uuid.uuid4)

    def __str__(self):
        return self.user.username
