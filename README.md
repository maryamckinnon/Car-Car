# CarCar

Team:

* Person 1 - Mary - Automobile Service
* Person 2 - Jacob - Auto Sales

## Design

## Service microservice

The models that will be necessary include Technician, Appointment, AutomobileVO, and a Status model (to handle the status of appointments - scheduled, canceled, and finished). Appointment has two ForeignKeys to the other models (Technician, Status), and has two functions to define when an appointment is considered finished vs canceled. AutomobileVO will poll data from the inventory microservice via poller.py. The data that we need from the inventory microservice is the vin number so that we can compare vin numbers in the inventory to vin numbers in appointments to determine if a customer is a "VIP".

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
