from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterUserSerializer(serializers.ModelSerializer):

    phone_number = serializers.CharField()

    class Meta:
        model = User 
        fields = ('username', 'email', 'first_name', 'last_name', 'phone_number')
    
    def validate(self, data):

        errors = {}

        username = data.get('username')
        email = data.get('email')

        if self.Meta.model.objects.filter(username__iexact=username).exists():
            errors['username'] = 'An account with that username already exists. Please choose a different username'

        if self.Meta.model.objects.filter(email__iexact=email).exists():
            errors['email'] = 'An account with that email address already exists.'

        if errors:
            raise serializers.ValidationError(errors)


        return data
    
    def create(self, validated_data):

        user = User.objects.create(
            username = self.validated_data['username'],
            email = self.validated_data['email'],
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name']
        )
        ## create jwt token
        token = RefreshToken.for_user(user=user).access_token

        # profile = Profile.objects.create(user=user)
        user.save()
        
        return user