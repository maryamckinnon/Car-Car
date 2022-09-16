FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY poll/requirements.txt requirements.txt
COPY poll/poller.py poller.py
COPY api/service_project service_project
COPY api/common common
COPY api/service_rest service_rest

RUN pip install -r requirements.txt
CMD python poller.py