import React, { useState } from 'react';


function AppointmentList(props) {
    console.log('beginning', props)

    return (
        <div className="appointment-list">
            <h1>Upcoming service appointments</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Purchased from dealership</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log('just before map', props.appointments)}
                        {props.appointments && props.appointments.filter(appointment => appointment.status.id === 1).map(appointment => {
                            return (
                                <tr key={ appointment.id }>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.customer_name }</td>
                                    <td>{ new Date(appointment.date).toLocaleDateString('en-US') }</td>
                                    <td>{ appointment.time }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>{ String(appointment.vip) }</td>
                                    <td>
                                        <button className="cancel" onClick={() => props.cancel(appointment)}>Cancel</button>
                                        <button className="finish" onClick={() => props.finish(appointment)}>Finish</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
        </div>
    );

}

export default AppointmentList;

// delete(item){
//     const data = this.state.data.filter(i => i.id !== item.id)
//     this.setState({data})
//   }