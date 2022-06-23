from django.shortcuts import render

from sales.api.common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin"
    ]


class SalesPerson(ModelEncoder):
    model = SalesPerson

def api_sales_person(request):
    