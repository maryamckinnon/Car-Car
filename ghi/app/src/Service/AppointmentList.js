import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';


function AppointmentList() {

    const [data, setData] = useState([]);

    function Redirect() {
        const navigate = useNavigate();
        function handleClick() {
            navigate('/appointments/new')
        }
        return (
            <div>
                <button className='btn btn-primary' style={{ marginLeft:'7em', marginBottom:'50px' }} onClick={handleClick}>Add new appointment</button>
            </div>
        )
    }

    async function appointmentCanceled(id) {
        if (window.confirm("Confirm appointment is canceled")) {
            const fetchConfig = {
                method: "PUT",
            }
            const url = `${process.env.REACT_APP_SERVICE_API}/api/appointments/${id}/canceled/`
            const response = fetch(url, fetchConfig);
            if (response.ok) {
                setData(data.filter((appointment) => appointment.id !== id))
            } window.location.reload();
        }
    }

    async function appointmentFinished(id) {
        if (window.confirm("Confirm appointment is finished")) {
            const fetchConfig = {
                method: "PUT",
            }
            const url = `${process.env.REACT_APP_SERVICE_API}/api/appointments/${id}/finished/`
            const response = fetch(url, fetchConfig);
            if (response.ok) {
                setData(data.filter((appointment) => appointment.id !== id))
            } window.location.reload();
        }
    }
    

    useEffect(() => {
        const url = `${process.env.REACT_APP_SERVICE_API}/api/appointments/`;

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
                <table className="table table-striped" style={{marginBottom:'200px', marginTop:'50px', backgroundColor:'#f5f5f5', marginBottom:'50px', borderRadius:10}}>
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
                                        <Button style={{fontWeight:'bold'}} variant="outlined" color="success" size="small" onClick={() => appointmentFinished(appointment.id)}>COMPLETE</Button>
                                    </td>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.customer_name }</td>
                                    <td>{ date.toLocaleDateString('en-US') }</td>
                                    <td>{ date.toLocaleTimeString() }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>{ (appointment.vip)? "👑" :"" }</td>
                                    <td>
                                        <Button style={{fontWeight:'bold'}} variant="outlined" color="error" size="small" onClick={() => appointmentCanceled(appointment.id)}>CANCEL</Button>
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