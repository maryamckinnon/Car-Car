// import React from 'react';


// class AppointmentList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       vin: '',
//       appointments: []
//     };
//     this.handleVinChange = this.handleVinChange.bind(this);
//     this.handleAppointmentChange = this.handleAppointmentChange.bind(this)
//     this.handleSearch = this.handleSearch.bind(this);
//   }

//   async componentDidMount() {
//       const response = await fetch("http://localhost:8080/api/appointments/");

//       if (response.ok) {
//         const data = await response.json();
//         this.setState({appointments: data.appointments});
//       }
//   }

//   handleVinChange(event) {
//     const value = event.target.value;
//     this.setState({vin: value})
//   }

//   handleAppointmentChange(event) {
//     const value = event.target.value;
//     this.setState({appointment: value})
//   }

//   async handleSearch(event) {
//     event.preventDefault();
//     const data = {...this.state};
//     console.log("data", data);

//     const appointmentUrl = 'http://localhost:8080/api/appointments/';
//       const fetchConfig = {
//         method: "get",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await fetch(appointmentUrl, fetchConfig);
//       if (response.ok) {
//         const results = await response.json();
//         console.log(results);

//       }
//   }