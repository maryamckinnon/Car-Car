from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()


class Appointment(models.Model):
    date = models.DateTimeField()
    reason = models.CharField(max_lengh=200)
    owner = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.PROTECT,
    )
    vin = models.ForeignKey(
        AutomobileVO,
        related_name="appointment",
        on_delete=models.PROTECT,
    )
