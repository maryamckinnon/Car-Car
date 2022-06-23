# CarCar

Team:

* Person 1 - Mary - Automobile Service
* Person 2 - Jacob - Auto Sales

## Design
Based on the high dependency of "Auto Sales" on "Inventory", those should be in one bounded context with the the aggregate root being the "Inventory" and the "Auto Sales" being an aggregate. This was decided because "Inventory" can exist on its own while "Auto Sales" is directly dependent on "Inventory" in order to function. "Automobile Services" can function on its own, so it's a 

The aggregate root in this project would be the inventory microservice with the aggregates being sales and service since both sales and service are dependent on the automobile inventory. 

## Service microservice

The models that will be necessary include Technician, Appointment, AutomobileVO, and a Status model (to handle the status of appointments - scheduled, canceled, and finished). Appointment has two ForeignKeys to the other models (Technician, Status), and has two functions to define when an appointment is considered finished vs canceled. AutomobileVO will poll data from the inventory microservice via poller.py. The data that we need from the inventory microservice is the vin number so that we can compare vin numbers in the inventory to vin numbers in appointments to determine if a customer is a "VIP".

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
