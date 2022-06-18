import React from 'react';

function AppointmentList(props) {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.data.appointments.map(appointment => {
                    return (
                        <tr key={ appointment.id }>
                            <td>{ appointment.automobile.vin }</td>
                            <td>{ appointment.date }</td>
                            <td>{ appointment.time }</td>
                            <td>{ appointment.technician }</td>
                            <td>{ appointment.reason }</td>
                            <td className="cancel">
                                <button>Cancel</button>
                            </td>
                            <td className="finished">
                                <button>Finished</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

}

export default AppointmentList;