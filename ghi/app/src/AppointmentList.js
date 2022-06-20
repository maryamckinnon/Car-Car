import React, { useState } from 'react';

function AppointmentList(props) {
    console.log('beginning', props)


    return (
        <div className="appointment-list">
            <h1>Service appointments</h1>
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
                        {console.log('just before map', props.data.appointments)}
                        {props.data.appointments.map(appointment => {
                            return (
                                <tr key={ appointment.id }>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.customer_name }</td>
                                    <td>{ appointment.date }</td>
                                    <td>{ appointment.date }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>{ appointment.vip }</td>
                                    <td><button>Cancel</button></td>
                                    <td><button>Finished</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
        </div>
    );

}

export default AppointmentList;