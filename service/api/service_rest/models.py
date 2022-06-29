from django.db import models

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

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="SCHEDULED")
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    date = models.DateField()
    time = models.TimeField()
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

    def finish(self):
        status = Status.objects.get(name="FINISHED")
        self.status = status
        self.save()

    def cancel(self):
        status = Status.objects.get(name="CANCELED")
        self.status = status
        self.save()