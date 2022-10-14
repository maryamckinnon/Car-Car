# Generated by Django 4.0.3 on 2022-10-04 14:55

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AutomobileVO",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "import_href",
                    models.CharField(max_length=200, null=True, unique=True),
                ),
                ("vin", models.CharField(max_length=17)),
            ],
        ),
        migrations.CreateModel(
            name="Status",
            fields=[
                (
                    "id",
                    models.PositiveSmallIntegerField(primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=20, null=True, unique=True)),
            ],
            options={
                "verbose_name_plural": "statuses",
                "ordering": ("id",),
            },
        ),
        migrations.CreateModel(
            name="Technician",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("employee_number", models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Appointment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateTimeField(default=django.utils.timezone.now)),
                ("reason", models.CharField(max_length=200)),
                ("customer_name", models.CharField(max_length=200)),
                ("vin", models.CharField(max_length=17)),
                (
                    "status",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="appointments",
                        to="service_rest.status",
                    ),
                ),
                (
                    "technician",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="appointments",
                        to="service_rest.technician",
                    ),
                ),
            ],
        ),
    ]
