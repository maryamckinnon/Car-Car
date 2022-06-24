# CarCar

Team:

* Person 1 - Mary - Automobile Service
* Person 2 - Jacob - Auto Sales

## Design
In general, in Domain-driven design, microservices are typically their own bounded contexts it seems, which is why they're able to be split up into microservices in the first place. "Sales," "Services," and "Inventory" are each their own separate microservices, meaning that they are able to function on their own in some capacity, meaning they could each be their own bounded context. However, "Sales" is directly dependent on "Inventory" because one can't sell cars without knowing what cars are in the inventory to sell, so putting them together in one bounded context makes sense. "Services," on the other hand, is not directly dependent on "Inventory" in order to fully function, so it can be in it's own bounded context.

Within the bounded context of "Sales" and "Inventory," the aggregate root would be automobiles since it's the common thread between the two microservices and it's what everything within "Inventory" and "Sales" is dependent on. One can't have an inventory without automobile and an automobile sales person can't sell anything without having automobiles in stock to sell. Descriptors of the automobile that included within this bounded context include the manufacturer, vehicle model, VIN number, 




## Service microservice

The models that will be necessary for "Services" include Technician, Appointment, AutomobileVO, and a Status model (to handle the status of appointments -- scheduled, canceled, and finished). Appointment has two ForeignKeys, one to Status and the other to Technicians, each of which demonstrating a one-to-many relationship with Appointment. I wrote two functions within the Appointment model in order to define when an appointment is considered finished vs canceled, with the default status when an appointment is created being "scheduled." 

The AutomobileVO model represents the Automobile model from "Inventory," but is labeled as a value object since within "Services," this class is considered immutable (since we can't change the VIN of an automobile that already exists).
AutomobileVO will poll data from "Inventory" via "poller.py". The data that we need from the inventory microservice is the VIN number so that we can compare VIN numbers in "Inventory" to VIN numbers in the Appointment model within "Services" to determine if a customer is a "VIP".


## Sales microservice
Explain your models and integration with the inventory
microservice, here.
