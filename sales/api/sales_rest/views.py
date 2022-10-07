from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "id",
        "import_href",
        "sold",
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "automobile",
        "sales_person",
        "customer",
        "price",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder()
    }


@require_http_methods(["GET"])
def automobile_vo_list(request, pk):
    if request.method == "GET":
        content = json.loads(request.body)
        automobile_id = content['automobile']
        automobiles = AutomobileVO.objects.filter(pk=automobile_id)
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def sales_person_list(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all().order_by("employee_number")
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalesPersonEncoder
        )
    else:
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def sales_person_details(request, pk):
    if request.method == "GET":
        sales_person = SalesPerson.objects.get(id=pk)
        try:
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({'message': 'Invalid sales person'})
            response.status_code = 404
            return response
    else:
        try:
            count, _ = SalesPerson.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except SalesPerson.DoesNotExist:
            return JsonResponse({'message': 'Invalid sales person'})


@require_http_methods(["GET", "POST"])
def customer_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def customer_delete(request, pk):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def sales_record_list(request):
    if request.method == "GET":
        sales_records = SalesRecord.objects.all()
        return JsonResponse(
            {"sales_records": sales_records},
            encoder=SalesRecordEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        
        automobile_id = content['automobile']
        automobile = AutomobileVO.objects.get(id=automobile_id)
        content['automobile'] = automobile
        
        sales_person_id = content['sales_person']
        sales_person = SalesPerson.objects.get(id=sales_person_id)
        content['sales_person'] = sales_person

        customer_id = content['customer']
        customer = Customer.objects.get(id=customer_id)
        content['customer'] = customer

        sales_record = SalesRecord.objects.create(**content)
        return JsonResponse(
            sales_record,
            encoder=SalesRecordEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def delete_sales_record(request, pk):
    if request.method == "DELETE":
        count, _ = SalesRecord.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})