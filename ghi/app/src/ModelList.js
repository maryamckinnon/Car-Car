import React from 'react';

function ModelList(props) {

    return (
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
                            <td><button className="btn btn-danger" onClick={() => props.delete(model)}>Delete</button></td>
                            {/* <td><button className="btn btn-info" onClick={() => props.edit(model)}>Edit</button></td> */}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

}

export default ModelList;