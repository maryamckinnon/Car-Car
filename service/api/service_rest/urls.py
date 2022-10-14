from django.urls import path

from .views import (
    api_list_appointments,
    api_show_appointments,
    api_cancel_appointment,
    api_finish_appointment,
    api_list_technicians,
)

urlpatterns = [
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path(
        "appointments/<str:vin>/", api_show_appointments, name="api_show_appointments"
    ),
    path(
        "appointments/<int:pk>/canceled/",
        api_cancel_appointment,
        name="api_cancel_appointment",
    ),
    path(
        "appointments/<int:pk>/finished/",
        api_finish_appointment,
        name="api_finish_appointment",
    ),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
]
