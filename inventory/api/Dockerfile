FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY manage.py manage.py
COPY common common
COPY inventory_project inventory_project
COPY inventory_rest inventory_rest

RUN pip install -r requirements.txt
CMD python manage.py migrate && gunicorn inventory_project.wsgi --bind 0.0.0.0:$PORT --log-file -
