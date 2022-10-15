import django
import os
import sys
import time
import json

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()
INVENTORY_API = os.environ["INVENTORY_API"]

from sales_rest.models import AutomobileVO


def get_automobiles():
    response = requests.get(f"{INVENTORY_API}/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"],
            defaults={"vin": automobile["vin"], "sold": automobile["sold"]},
        )


def poll():
    while True:
        print("Sales poller polling for data")
        try:
            get_automobiles()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
