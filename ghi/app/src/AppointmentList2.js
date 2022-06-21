// import React, { useState } from 'react';

// // function deleteRow(props) {
// //     const data = this.state.appointments.filter(i => i.id !== appointment.id)
// //     this.setState({data})
// // }

// const AppointmentList = () => {
//     console.log('beginning', props)
//     const [appointments, setAppointments] = useState(data);
//     const handleDeleteClick = (appointmentId) => {
//         const newAppointments = [...appointments];

//         const index = appointments.findIndex((appointment)=> appointment.id === appointment.)
//     }

//     return (
//         <div className="appointment-list">
//             <h1>Service appointments</h1>
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>VIN</th>
//                             <th>Customer name</th>
//                             <th>Date</th>
//                             <th>Time</th>
//                             <th>Technician</th>
//                             <th>Reason</th>
//                             <th>Purchased from dealership</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {console.log('just before map', props.data.appointments)}
//                         {props.data.appointments.map(appointment => {
//                             return (
//                                 <tr key={ appointment.id }>
//                                     <td>{ appointment.vin }</td>
//                                     <td>{ appointment.customer_name }</td>
//                                     <td>{ new Date(appointment.date).toLocaleDateString() }</td>
//                                     <td>{ appointment.time }</td>
//                                     <td>{ appointment.technician.name }</td>
//                                     <td>{ appointment.reason }</td>
//                                     <td>{ String(appointment.vip) }</td>
//                                     <td>
//                                         <button className="btn btn-danger" onClick={this.deleteRow.bind(this, appointment.id)}>
//                                             <i className="fa-solid fa-trash">Cancel</i>
//                                         </button>
//                                     </td>
//                                     <td><button>Finished</button></td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//         </div>
//     );

// }

// export default AppointmentList;



class Example extends React.Component {
    constructor(){
    this.state = {
      data: [
        {id:1, name: 'Hello'},
        {id:2, name: 'World'},
        {id:3, name: 'How'},
        {id:4, name: 'Are'},
        {id:5, name: 'You'},
        {id:6, name: '?'}
      ]
    }
  }
  // shorter & readable
  delete(item){
    const data = this.state.data.filter(i => i.id !== item.id)
    this.setState({data})
  }
  // or this way, it works as well
  //delete(item){
  //  const newState = this.state.data.slice();
  //    if (newState.indexOf(item) > -1) {
  //    newState.splice(newState.indexOf(item), 1);
  //    this.setState({data: newState})
  //  }
  //}
  render(){
    const listItem = this.state.data.map((item)=>{
        return <div key={item.id}>
        <span>{item.name}</span> <button onClick={this.delete.bind(this, item)}>Delete</button>
      </div>
    })
    return <div>
        {listItem}
    </div>
  }
}
React.render(<Example />, document.getElementById('container'));