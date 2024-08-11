from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import *


User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'password']


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