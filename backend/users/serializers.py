from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import *


User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    re_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )
     
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'name', 'phone_number', 'password', 're_password']

    def validate(self, attrs):
        # Perform validation for password and re_password fields
        if attrs["password"] != attrs["re_password"]:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        validated_data.pop(
            "re_password"
        )  # Remove re_password field before creating the user
        return super().create(validated_data)
    
class CustomUserSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone_number', 'is_staff']
 

# class AppointmentSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source = 'name')
    start = serializers.DateField(source = 'start_date')
    end = serializers.DateField(source = 'end_date')
    classNames = serializers.CharField(source='status')

    class Meta:
        model = Appointments
        fields = ('id', 'start', 'classNames', 'end', 'title')

class UserAppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserAppointments
        fields = '__all__'

class CommunitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Community
        fields = ('id', 'comments', 'date_field', 'start_time')