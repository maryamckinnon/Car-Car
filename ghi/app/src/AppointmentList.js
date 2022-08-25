import React from 'react';


function AppointmentList(props) {

    return (
        <div className="appointment-list">
            <h1>Service appointments</h1>
                <table className="table table-striped" style={{marginBottom:'200px', marginTop:'50px'}}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>VIN</th>
                            <th>CUSTOMER</th>
                            <th>DATE</th>
                            <th>TIME</th>
                            <th>TECHNICIAN</th>
                            <th>REASON</th>
                            <th>VIP</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.appointments && props.appointments.filter(appointment => appointment.status.id === 1).map(appointment => {
                            return (
                                <tr key={ appointment.id }>
                                    <td>
                                        <button className="btn btn-success" onClick={() => props.finish(appointment)}>✔</button>
                                    </td>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.customer_name }</td>
                                    <td>{ new Date(appointment.date).toLocaleDateString('en-US') }</td>
                                    <td>{ appointment.time }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>{ (appointment.vip)? "👑" :"" }</td>
                                    <td>
                                        <button className="btn btn-danger" style={{fontWeight:"bolder"}} onClick={() => props.cancel(appointment)}>X</button>
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