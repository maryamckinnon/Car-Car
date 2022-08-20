import React from 'react';
import ManufacturerForm from "./ManufacturerForm";


function ManufacturerList(props) {

    return (
        <>
        <h1> Manufacturers </h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.manufacturers.map(manufacturer => {
                    return (
                        <tr key={ manufacturer.id }>
                            <td>{ manufacturer.name }</td>
                            <td><button className="btn btn-danger" onClick={() => props.delete(manufacturer)}>X</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );
}

export default ManufacturerList;