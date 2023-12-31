import React from "react";
import "../index.css";

class AppointmentHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: "",
      appointments: [],
    };
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleVinChange(event) {
    const value = event.target.value;
    this.setState({ vin: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const vin = this.state.vin;
    const appointmentUrl = `${process.env.REACT_APP_SERVICE_API}/api/appointments/${vin}/`;
    const fetchConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      const results = await response.json();
      this.setState({ appointments: results });
      if (results.length === 0) {
        alert("No matches were found");
      }
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>Service History</h1>
          <form
            onSubmit={this.handleSubmit}
            id="search-vin"
            className="search-bar"
          >
            <div className="input-group">
              <input
                required
                type="search"
                id="search-bar"
                onChange={this.handleVinChange}
                value={this.state.vin}
                className="form-control rounded"
                placeholder="Search VIN"
                aria-label="Search"
                aria-describedby="search-addon"
              ></input>
              <button
                variant="contained"
                size="medium"
                style={{
                  backgroundColor: "black",
                  fontWeight: "bolder",
                  color: "white",
                }}
              >
                SEARCH
              </button>
            </div>
          </form>
        </div>
        <div className="appointment-list">
          <table
            className="table table-hover"
            style={{ marginTop: 75, marginBottom: "200px" }}
          >
            <thead>
              <tr>
                <th>VIN</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.appointments.map((appointment) => {
                const date = new Date(appointment.date);
                return (
                  <tr
                    key={appointment.id}
                    style={{
                      backgroundColor: !!(
                        appointment.status.name === "SCHEDULED"
                      )
                        ? "#FFFFE0"
                        : !!(appointment.status.name === "CANCELED")
                        ? "#fdedea"
                        : "#e4fce6",
                    }}
                  >
                    <td>{appointment.vin}</td>
                    <td>{appointment.customer_name}</td>
                    <td>{date.toLocaleDateString("en-US")}</td>
                    <td>{date.toLocaleTimeString()}</td>
                    <td>{appointment.technician.name}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status.name}</td>
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
