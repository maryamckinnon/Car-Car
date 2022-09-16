FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY manage.py manage.py
COPY sales_project sales_project
COPY common common
COPY sales_rest sales_rest

RUN pip install -r requirements.txt
CMD python manage.py migrate && gunicorn sales_project.wsgi --bind 0.0.0.0:$PORT --log-file -
