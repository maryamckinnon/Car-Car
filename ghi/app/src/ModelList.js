import React from 'react';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import noimage from "./images/noimage.png";

function ModelList(props) {

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
                {props.models && props.models.map(model => {
                    return (
                        <tr key={ model.id }>
                            <td>{ model.name }</td>
                            <td>{ model.manufacturer.name }</td>
                            <td><img src={ model.picture_url } height={100}></img></td>
                            <td><button className="btn btn-danger" onClick={() => props.delete(model)}>X</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );


}

export default ModelList;