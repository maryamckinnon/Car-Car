import React from 'react';


function ManufacturerList(props) {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.manufacturers.map(manufacturer => {
                    return (
                        <tr key={ manufacturer.id }>
                            <td>{ manufacturer.name }</td>
                            <td><button className="btn btn-danger" onClick={() => props.delete(manufacturer)}>Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ManufacturerList;