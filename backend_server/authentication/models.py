from django.db import models
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', primary_key=True)
    phone_number = models.CharField(max_length=20)
    uid = models.UUIDField(default=uuid.uuid4)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
    
    def get_user(self):
        return self.user
    # @staticmethod
    # def get_profile(self):
    #     return self.profile 
