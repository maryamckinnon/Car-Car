import React, { useState } from 'react';
import { renderMatches } from 'react-router-dom';
import AppointmentList from './AppointmentList';


class AppointmentHistory extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        vin: '',
        appointments: []
      };
      this.handleVinChange = this.handleVinChange.bind(this);
      this.handleAppointmentChange = this.handleAppointmentChange.bind(this)
      this.handleSearch = this.handleSearch.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:8080/api/appointments/");
  
        if (response.ok) {
          const data = await response.json();
          this.setState({appointments: data.appointments});
        }
    }

    handleVinChange(event) {
      const value = event.target.value;
      this.setState({vin: value})
    }

    handleAppointmentChange(event) {
      const value = event.target.value;
      this.setState({appointment: value})
    }

    async handleSearch(event) {
      event.preventDefault();
      const data = {...this.state};
      console.log("data", data);

      const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
          method: "get",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
          const listAppointments = await response.json();
          console.log(listAppointments);

          const cleared = {
            vin: '',
            appointment: ''
          };
          this.setState(cleared);
        }
    }

    render() {
      return (
        <div>
          <div className="input-group">
            <form onSubmit={this.handleSearch} id="search-vin">
              <div className="form-outline">
                <input type="search" id="form1" 
                  onChange={this.handleVinChange} value={this.state.vin} 
                  className="form-control rounded" placeholder="Search" aria-label="Search" 
                  aria-describedby="search-addon" />
                  <button type="button" className="btn btn-outline-primary">search</button>
              </div>
            </form>
            
            </div>
          <h1>Service Appointments</h1>
          {this.state.appointments.filter(appointment => 
          appointment.vin === this.state.vin)}
          {console.log(this.state.appointments.filter(appointment => 
            appointment.vin === this.state.vin)).map(appointment => {
              return (
                {appointment}
              )
            })}
        
        </div>
      );
  }
}

export default AppointmentHistory;
