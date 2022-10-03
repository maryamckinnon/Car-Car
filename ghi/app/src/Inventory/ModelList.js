import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from 'react-router-dom';
import ModelForm from './ModelForm';

function ModelList() {
    const [data, setData] = useState([]);

    function Redirect() {
        const navigate = useNavigate();
        function handleClick() {
            navigate('/models/new')
        }
        return (
            <div>
                <button className='btn btn-primary' onClick={handleClick}>Add new model</button>
            </div>
        )
    }

    // async function deleteModel(id) {
    //     const fetchConfig = {
    //         method: 'DELETE'
    //     }
    //     const url = `http://localhost:8100/api/models/${id}`
    //     const response = await fetch(url, fetchConfig);
    //     if (response.ok) {
    //         setData(
    //             data.filter((model) => model.id !== id)
    //         )
    //     }
    // }

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
        <table className="table table-striped table-hover">
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
                            {/* <td><button className="btn btn-danger" onClick={deleteModel}>X</button></td> */}
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