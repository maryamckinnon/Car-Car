from django.urls import path

from .views import (
    api_list_appointments,
    api_list_technicians
)

urlpatterns = [
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
]