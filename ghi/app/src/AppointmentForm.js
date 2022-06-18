import React from 'react';

class AppointmentForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        vin: '',
        customerName: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
      };
      this.handleVinChange = this.handleVinChange.bind(this);
      this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleTimeChange = this.handleTimeChange.bind(this);
      this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
      this.handleReasonChange = this.handleReasonChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleVinChange(event) {
      const value = event.target.value;
      this.setState({vin: value})
    }

    handleCustomerNameChange(event) {
        const value = event.target.value;
        this.setState({customerName: value})
    }

    handleDateChange(event) {
        const value = event.target.value;
        this.setState({date: value})
    }

    handleTimeChange(event) {
        const value = event.target.value;
        this.setState({vin: value})
    }
    
    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({technician: value})
    }

    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({reason: value})
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      data.customer_name = data.customerName;
      delete data.customerName;
      console.log("data", data);

      const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
          const newAppointment = await response.json();
          console.log(newAppointment);

          const cleared = {
            vin: '',
            customerName: '',
            date: '',
            time: '',
            technician: '',
            reason: '',
          };
          this.setState(cleared);
        }
    }
    
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Enter a service appointment</h1>
                    <form onSubmit={this.handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleVinChange} placeholder="Vin" 
                        required type="text" name="vin" 
                        id="vin" className="form-control" value={this.state.vin}/>
                        <label htmlFor="vin">VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleCustomerNameChange} placeholder="customerName" 
                        required type="text" name="customerName" 
                        id="customerName" className="form-control" value={this.state.customerName}/>
                        <label htmlFor="customerName">Customer Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleDateChange} placeholder="Date" required 
                        type="date" name="date" id="date" className="form-control" value={this.state.date}/>
                        <label htmlFor="date">Date</label>
                    {/* </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" name="description" id="time"
                        onChange={this.handleTime} value={this.state.time}>
                        </textarea>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleMaxPresentationsChange} placeholder="Max_presentations" 
                        required type="number" name="max_presentations" 
                        id="max_presentations" className="form-control" value={this.state.maxPresentations}/>
                        <label htmlFor="max_presentations">Maximum Presentations</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleMaxAttendeesChange} placeholder="Max_attendees" 
                        required type="number" name="max_attendees" 
                        id="max_attendees" className="form-control" value={this.state.maxAttendees}/>
                        <label htmlFor="max_attendees">Maximum Attendees</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleLocationChange} required id="location" 
                        className="form-select" name="location" value={this.state.location}>
                        <option value="">Location</option>
                        {this.state.locations.map(location => {
                            return (
                                <option key={location.id} value={location.id}> {location.name} </option>
                            );
                        })}
                        </select> */}
                    </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

export default ManufacturerForm;