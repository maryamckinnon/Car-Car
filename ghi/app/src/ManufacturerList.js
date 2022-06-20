import React from 'react';

function ManufacturerList(props) {
    console.log(props)

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                </tr>
            </thead>
            <tbody>
                {console.log(props.data.manufacturers)}
                {props.data.manufacturers.map(manufacturer => {
                    return (
                        <tr key={ manufacturer.id }>
                            <td>{ manufacturer.name }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ManufacturerList;