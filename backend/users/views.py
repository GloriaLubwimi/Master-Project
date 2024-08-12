from rest_framework import viewsets, permissions, status
from .serializers import *
from rest_framework.response import Response
from .models import *

class AppointmentViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Appointments.objects.all()
    serializer_class = AppointmentSerializer

    def list(self, request):
        queryset = Appointments.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
    

class UserAppointmentViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = UserAppointments.objects.all()
    serializer_class = UserAppointmentSerializer

    def list(self, request):
        queryset = UserAppointments.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
    

    def update(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(data=request.data, instance = queryset)
        if serializer.is_valid():
            user_appointment = serializer.save()
            appoint = Appointments.objects.get(pk=user_appointment.appointment.pk)
            appoint.status = "In Progress"
            appoint.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_appointment = serializer.save()
            appoint = Appointments.objects.get(pk=user_appointment.appointment.pk)
            appoint.status = "In Progress"
            appoint.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)