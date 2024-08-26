from rest_framework import viewsets, permissions, status
from .serializers import *
from rest_framework.response import Response
from .models import *
from rest_framework.decorators import action
from django.db.models import Q



class AppointmentViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Appointments.objects.all()
    serializer_class = AppointmentSerializer

    def get_permissions(self):
        if self.action == 'create' or self.action == "destroy":
            return [permissions.IsAdminUser()]
        else:
            return [permissions.AllowAny()]
    
    def list(self, request):
        queryset = Appointments.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        queryset.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True)
    def user_appointments(self, request, pk=None):
        appointments = []
        for q in UserAppointments.objects.filter(user__pk=pk).select_related("appointment"):
            appointments.append(q.appointment)
        return Response(self.serializer_class(appointments, many=True).data)
    
    @action(detail=True)
    def users(self, request, pk=None):
        return Response(UserAppointmentSerializer(UserAppointments.objects.filter(appointment__pk=pk), many=True).data)
    

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
        appoint = Appointments.objects.get(pk=queryset.appointment.pk)
        queryset.delete()
        user_appointments = UserAppointments.objects.filter(appointment__pk=appoint.pk)
        if len(user_appointments) < 1:
            appoint.status = 'Available'
            appoint.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True)
    def user_appointments(self, request, pk=None):
        appointments = UserAppointments.objects.filter(user__pk=pk)
        return Response(self.serializer_class(appointments, many=True).data)
    
    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAdminUser])
    def book(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        appointment = queryset.appointment
        appointment.status = 'Booked'
        appointment.save()
        queryset.status = 'accepted'
        queryset.save()
        for q in  self.queryset.filter(~Q(pk=pk) & Q(appointment__pk=appointment.pk)):
            q.status = 'rejected'
            q.save()
        return Response(self.serializer_class(queryset).data)
    

class CommunityViewset(viewsets.ViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer

    def get_permissions(self):
        if self.action in ['create', 'update' , 'destroy']:
            print(self.action)
            return [permissions.IsAdminUser()]
        else:
            return [permissions.AllowAny()]

    def list(self, request):
        queryset = Community.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(data=request.data, instance = queryset)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk):
        print("HERE")
        queryset = self.queryset.get(pk=pk)
        print(queryset)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)