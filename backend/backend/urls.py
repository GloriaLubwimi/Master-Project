from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/auth/", include('djoser.urls')),
    path("api/v1/auth/", include('djoser.urls.jwt')),
    path('', include('users.urls')),
    path('', include('users.user_appointment_urls')),
    path('', include('users.community_urls'))

]
