import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ModelForm from './ModelForm';

function ModelList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8100/api/models/';
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json['models']))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
    }, [data]);

    return (
        <>
        <h1>Vehicle Models</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data && data.map(model => {
                    return (
                        <tr key={ model.id }>
                            <td>{ model.name }</td>
                            <td>{ model.manufacturer.name }</td>
                            <td><img src={ model.picture_url } height={100}></img></td>
                            {/* <td><button className="btn btn-danger" onClick={() => props.delete(model)}>X</button></td> */}
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <ModelForm />
        {/* <button className='btn btn-primary' style={{fontWeight:'bolder', marginLeft:'180px'}} onClick={() => (navigate('/models/new/'))}>Add Model</button> */}
        </>
    );
}

export default ModelList;