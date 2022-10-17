from django.urls import path
from .views import (
    automobile_vo_list,
    update_automobile_vo,
    sales_person_list,
    sales_person_details,
    customer_list,
    customer_delete,
    sales_record_list,
    delete_sales_record,
)


urlpatterns = [
    path("automobileVO/", automobile_vo_list, name="automobile_vo_list"),
    path("automobileVO/<str:vin>/", update_automobile_vo, name="update_automobile_vo"),
    path("sales-people/", sales_person_list, name="sales_person_list"),
    path("sales-people/<int:pk>/", sales_person_details, name="sales_person_details"),
    path("customers/", customer_list, name="customer_list"),
    path("customers/<int:pk>/", customer_delete, name="customer_delete"),
    path("sales-records/", sales_record_list, name="sales_record_list"),
    path("sales-records/<int:pk>/", delete_sales_record, name="delete_sales_record"),
]
