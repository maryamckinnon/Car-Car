import React from 'react';

class AppointmentForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        vin: '',
        customerName: '',
        date: '',
        time: '',
        reason: '',
        technicians: [],
      };
      this.handleVinChange = this.handleVinChange.bind(this);
      this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleTimeChange = this.handleTimeChange.bind(this);
      this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
      this.handleReasonChange = this.handleReasonChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/';
      
        const response = await fetch(url);
  
        if (response.ok) {
          const data = await response.json();
          this.setState({technicians: data.technicians});
        }
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
      delete data.technicians;
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
                        <input onChange={this.handleCustomerNameChange} placeholder="customer_name" 
                        required type="text" name="customer_name" 
                        id="customer_name" className="form-control" value={this.state.customerName}/>
                        <label htmlFor="customer-name">Customer Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleDateChange} placeholder="Date" required 
                        type="date" name="date" id="date" className="form-control" value={this.state.date}/>
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="time" className="form-label">Time</label>
                        <input onChange={this.handleTimeChange} className="form-control" 
                        name="time" id="time" required type="time" placeholder="time"
                        value={this.state.time}/>
                    </div>
                    <div className="mb-3">
                    <select required id="technician" className="form-select" name="technician" 
                    onChange={this.handleTechnicianChange} value={this.state.technician}>
                      <option value="">Choose a technician</option>
                      {this.state.technicians.map(technician => {
                        return (
                          <option key={technician.id} value={technician.name}>
                            {technician.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleReasonChange} placeholder="reason" 
                        required type="text" name="reason" 
                        id="reason" className="form-control" value={this.state.reason}/>
                        <label htmlFor="reason">Reason</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

export default AppointmentForm;