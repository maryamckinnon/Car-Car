import React from 'react';
import SearchBar from './SearchBar';


// class AppointmentHistory extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         vin: '',
//       };
//       this.handleVinChange = this.handleVinChange.bind(this);
//       this.handleSearch = this.handleSearch.bind(this);
//     }

//     async componentDidMount() {
//         const response = await fetch("http://localhost:8080/api/appointments/");
  
//         if (response.ok) {
//           const data = await response.json();
//           this.setState({vin: data.vin});
//         }
//     }

//     handleVinChange(event) {
//       const value = event.target.value;
//       this.setState({vin: value})
//     }

//     async handleSearch(event) {
//       event.preventDefault();
//       const data = {...this.state};
//       console.log("data", data);

//       const appointmentUrl = 'http://localhost:8080/api/appointments/';
//         const fetchConfig = {
//           method: "get",
//           body: JSON.stringify(data),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         };
//         const response = await fetch(appointmentUrl, fetchConfig);
//         if (response.ok) {
//           const newAppointment = await response.json();
//           console.log(newAppointment);

//           const cleared = {
//             vin: '',
//           };
//           this.setState(cleared);
//         }
//     }
    
//     render() {
//         return (
//             <div className="row">
//               <SearchBar />
//                 {/* <div className="offset-3 col-6"> */}
//                     {/* <form onSubmit={this.handleSearch} id="search-appointments">
//                     <div className="form-floating mb-3">
//                         <input onChange={this.handleVinChange} placeholder="Vin" 
//                         type="search" name="vin" 
//                         id="vin" className="form-control" value={this.state.vin}/>
//                         <label htmlFor="vin">Enter VIN</label><button type="button" className="btn btn-primary">
//                         <i className="fas fa-search">Search</i>
//                         </button>
//                     </div>
//                     </form> */}
//                     <div className="appointment-list">
//                       <h1>Service appointments</h1>
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>VIN</th>
//                                     <th>Customer name</th>
//                                     <th>Date</th>
//                                     <th>Time</th>
//                                     <th>Technician</th>
//                                     <th>Reason</th>
//                                     <th>Purchased from dealership</th>
//                                     <th></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {console.log('just before map', props.data.appointments)}
//                                 {props.data.appointments.filter(appointment => {
//                                     return (
//                                         <tr key={ appointment.id }>
//                                             <td>{ appointment.vin }</td>
//                                             <td>{ appointment.customer_name }</td>
//                                             <td>{ new Date(appointment.date).toLocaleDateString() }</td>
//                                             <td>{ appointment.time }</td>
//                                             <td>{ appointment.technician.name }</td>
//                                             <td>{ appointment.reason }</td>
//                                             <td>{ String(appointment.vip) }</td>
//                                             {/* <td><button>Canceled</button></td>
//                                                 <button className="btn btn-danger" onClick={() => Delete(appointment.id)}>
//                                                     <i className="fa-solid fa-trash"></i>
//                                                 </button>; */}
//                                             <td><button>Finished</button></td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                       </div>
//                   </div>
//         );
//     }
// }


function AppointmentHistory(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const results = props.data.appointments.filter(appointment =>
      appointment.includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map(appointment => (
          <li>{appointment}</li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentHistory;