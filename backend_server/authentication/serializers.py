from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User 
        fields = ('username', 'email', 'first_name', 'last_name', 'password')

    
    def validate(self, attrs):

        errors = {}

        username = attrs.pop('username')
        email = attrs.pop('email')
        print('username', username, email)

        if self.Meta.model.objects.filter(username__iexact=username).exists():
            errors['username'] = 'An account with that username already exists. Please choose a different username'

        if self.Meta.model.objects.filter(email__iexact=email).exists():
            errors['email'] = 'An account with that email address already exists.'

        if errors:
            raise serializers.ValidationError(errors)


        return super().validate(attrs)
    
    def create(self, validated_data):

        user = User.objects.create(
            username = self.validated_data['username'],
            email = self.validated_data['email'],
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name']
        )

        password = validated_data.pop('password')

        user.set_password(password)

        user.save()

        return user
