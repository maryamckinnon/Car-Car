import React, { useState } from 'react';

function AppointmentList(props) {
    console.log('beginning', props)

    const enUSFormatter = new Intl.DateTimeFormat('en-US')
    
    // const Delete = (del) => {
    //     const delData = data.filter((tbd) => {
    //       return del !== tbd.id;
    //     });
    //     setTableData(delData);
    //   };

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
                                    <td>{ enUSFormatter.format(appointment.d) }</td>
                                    <td>{ enUSFormatter.format(appointment.t) }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>{ String(appointment.vip) }</td>
                                    <td>
                                        {/* <button className="btn btn-danger" onClick={() => Delete(appointment.id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>; */}
                                    </td>
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