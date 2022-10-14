from django.db import models
from django.urls import reverse
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator,
)


class Manufacturer(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def get_api_url(self):
        return reverse("api_manufacturer", kwargs={"pk": self.id})


class VehicleModel(models.Model):
    name = models.CharField(max_length=100)
    picture_url = models.URLField()
    price = models.FloatField(
        validators=(
            MaxValueValidator(1000000),
            MinValueValidator(1),
        ),
        null=True,
    )
    manufacturer = models.ForeignKey(
        Manufacturer,
        related_name="models",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_vehicle_model", kwargs={"pk": self.id})


class Automobile(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model = models.ForeignKey(
        VehicleModel,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )
    sold = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})
