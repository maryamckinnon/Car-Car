from django.db import models
from django.utils import timezone

# Create your models here.


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    vin = models.CharField(max_length=17)


class Status(models.Model):
    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=20, unique=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)
        verbose_name_plural = "statuses"


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()


class Appointment(models.Model):
    date = models.DateTimeField(default=timezone.now)
    reason = models.CharField(max_length=200)
    customer_name = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    vin = models.CharField(max_length=17)
    status = models.ForeignKey(
        Status,
        related_name="appointments",
        on_delete=models.PROTECT,
        default=1,
    )

    @classmethod
    def create(cls, **kwargs):
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    def finish(self):
        try:
            status = Status.objects.get(id=2)
        except Status.DoesNotExist:
            status = Status.objects.create(id=2, name='FINISHED') 
        self.status = status
        self.save()

    def cancel(self):
        try:
            status = Status.objects.get(id=3)
        except Status.DoesNotExist:
            status = Status.objects.create(id=3, name='CANCELED') 
        self.status = status
        self.save()
