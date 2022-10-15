from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment, Status
import json

# Create your views here.


class StatusEncoder(ModelEncoder):
    model = Status
    properties = ["id", "name"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["id", "import_href", "vin"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "name", "employee_number"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "date",
        "technician",
        "reason",
        "status",
    ]
    encoders = {"technician": TechnicianEncoder(), "status": StatusEncoder()}

    def get_extra_data(self, o):
        count = AutomobileVO.objects.filter(vin=o.vin).count()
        return {"vip": count > 0}


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all().order_by("date")
        return JsonResponse({"appointments": appointments}, encoder=AppointmentEncoder)
    else:
        content = json.loads(request.body)
        try:
            id = content["technician"]
            technician = Technician.objects.get(pk=id)
            content["technician"] = technician

        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Could not create the appointment"},
                status=400,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.finish()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.cancel()
    return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)


@require_http_methods(["GET"])
def api_show_appointments(request, vin):
    appointments = Appointment.objects.filter(vin=vin)
    return JsonResponse(
        appointments,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Could not input technician"})
            response.status_code = 400
            return response
