FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY poll/requirements.txt requirements.txt
COPY poll/poller.py poller.py
COPY api/sales_project sales_project
COPY api/common common
COPY api/sales_rest sales_rest

RUN pip install -r requirements.txt
CMD python poller.py
