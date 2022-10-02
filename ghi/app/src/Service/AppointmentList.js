import React, { useEffect, useState } from 'react';


function AppointmentList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/api/appointments/';

        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json['appointments']))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
    }, [data]);

    return (
        <div className="appointment-list">
            <h1>Service appointments</h1>
                <table className="table table-striped" style={{marginBottom:'200px', marginTop:'50px'}}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>VIN</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>VIP</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.filter(appointment => appointment.status.id === 1).map(appointment => {
                            const date = new Date(appointment.date)
                            return (
                                <tr key={ appointment.id }>
                                    <td>
                                        {/* <button className="btn btn-success" onClick={() => props.finish(appointment)}>✔</button> */}
                                    </td>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.customer_name }</td>
                                    <td>{ date.toLocaleDateString('en-US') }</td>
                                    <td>{ date.toLocaleTimeString() }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>{ (appointment.vip)? "👑" :"" }</td>
                                    <td>
                                        {/* <button className="btn btn-danger" style={{fontWeight:"bolder"}} onClick={() => props.cancel(appointment)}>X</button> */}
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