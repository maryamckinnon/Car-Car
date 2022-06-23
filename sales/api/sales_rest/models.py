from django.db import models

    
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=12)


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
    price = models.CharField(max_length=50)