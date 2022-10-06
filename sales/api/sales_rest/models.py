from django.db import models
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator,
)
from django.urls import reverse
    

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.vin}"

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.name}"


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=12)

    def __str__(self):
        return f"{self.name}"


class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales_records",
        on_delete=models.PROTECT,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_records",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales_records",
        on_delete=models.PROTECT,
    )
    price = models.FloatField(validators=(
        MaxValueValidator(1000000),
        MinValueValidator(1),
    ), null=True
    )

    def __str__(self):
        return f"{self.sales_person}"