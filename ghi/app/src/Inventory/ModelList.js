import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import ModelForm from './ModelForm';

function ModelList() {
    const [data, setData] = useState([]);

    async function deleteModel(id) {
        const fetchConfig = {
            method: "DELETE",
        }
        const url = `http://localhost:8100/api/models/${id}`
        const response = fetch(url, fetchConfig);
        if (response.ok) {
            setData(data.filter((model) => model.id !== id))
        } window.location.reload();
    }

    useEffect(() => {
        const url = 'http://localhost:8100/api/models/';
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json['models']))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
    }, [data]);
    console.log(data)


    return (
        <>
        <h1>Vehicle Models</h1>
        <table className="table">
            <thead>
                <tr>
                    <th style={{textAlign:'left'}}>Name</th>
                    <th style={{textAlign:'left'}}>Manufacturer</th>
                    <th>Starting MSRP</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data && data.map(model => {
                    return (
                        <tr key={ model.id }>
                            <td style={{textAlign:'left'}}>{ model.name }</td>
                            <td style={{textAlign:'left'}}>{ model.manufacturer.name }</td>
                            <td>${ new Intl.NumberFormat().format(model.price) }</td>
                            <td><img src={ model.picture_url } height={100}></img></td>
                            <td><Button variant="outlined" color="error" size="small" onClick={() => deleteModel(model.id)}>X</Button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <ModelForm />
        </>
);
}

export default ModelList;