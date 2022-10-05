import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


function AppointmentList() {

    const [data, setData] = useState([]);

    function Redirect() {
        const navigate = useNavigate();
        function handleClick() {
            navigate('/appointments/new')
        }
        return (
            <div>
                <button className='btn btn-primary' onClick={handleClick}>Add new appointment</button>
            </div>
        )
    }

    // async function finishAppointment() {
    //     if (window.confirm("Confirm appointment is finished")) {
    //       const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}/finished/`
    //       const fetchConfig = {
    //         method: "PUT",
    //       }
    //     const response = await fetch(appointmentUrl, fetchConfig);
    //     if (response.ok) {
    //       const newAppointments = this.state.appointments.filter((app) => appointment.id !== app.id)
    //       this.setState({appointments: newAppointments})
    //     }
    //     }
    //   }
    

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
                                    {/* <td>
                                        <button className="btn btn-success" onClick={finishAppointment}>✔</button>
                                    </td> */}
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
                <Redirect />
        </div>
    );

}

export default AppointmentList;