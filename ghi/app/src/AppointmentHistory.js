import React from 'react';


class AppointmentHistory extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        vin: '',
        // appointments: []
      };
      this.handleVinChange = this.handleVinChange.bind(this);
      // this.handleAppointmentChange = this.handleAppointmentChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // async componentDidMount() {
    //     const response = await fetch("http://localhost:8080/api/appointments/");
  
    //     if (response.ok) {
    //       const data = await response.json();
    //       this.setState({appointments: data.appointments});
    //     }
    // }

    handleVinChange(event) {
      const value = event.target.value;
      this.setState({vin: value})
    }

    // handleAppointmentChange(event) {
    //   const value = event.target.value;
    //   this.setState({appointment: value})
    // }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      console.log("data", data);

      const vin = data.appointments.vin
      const appointmentUrl = `http://localhost:8080/api/appointments/${vin}`;
        const fetchConfig = {
          method: "get",
          headers: {
            'Content-Type': 'application/json',
          },
      };
      const response = await fetch(appointmentUrl, fetchConfig);
      if (response.ok) {
        const newAppointmentList = await response.json();
        console.log(newAppointmentList);

      }
    }

    render() {
      return (
        <div>
          <div className="input-group">
            <form onSubmit={this.handleSubmit} className="search-bar" id="search-vin">
              <div className="form-floating-mb-3">
                <input type="search" id="form1" 
                  onChange={this.handleVinChange} value={this.state.vin} 
                  className="form-control rounded" placeholder="Search VIN" aria-label="Search" 
                  aria-describedby="search-addon" />
              </div>
              <button className="btn btn-primary">Search</button>
            </form>
            </div>
          <div className="appointment-list">
            <h1>Service history</h1>
            {/* note: service history includes only canceled and finished appointments */}
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>VIN</th>
                      <th>Customer name</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Technician</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.appointments.map(appointment => {
                  return (
                    <tr key={ appointment.id }>
                      <td>{ appointment.vin }</td>
                      <td>{ appointment.customer_name }</td>
                      <td>{ new Date(appointment.date).toLocaleDateString('en-US') }</td>
                      <td>{ appointment.time }</td>
                      <td>{ appointment.technician.name }</td>
                      <td>{ appointment.reason }</td>
                      <td>{ appointment.status.name }</td>
                    </tr>
                );
            })}
            </tbody>
          </table>
          </div>
        </div>
      );
  }
}

export default AppointmentHistory;
