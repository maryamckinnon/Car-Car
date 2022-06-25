import React from 'react';

function ModelList(props) {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {props.models && props.models.map(model => {
                    return (
                        <tr key={ model.id }>
                            <td>{ model.name }</td>
                            <td>{ model.manufacturer.name }</td>
                            <td><img src={ model.picture_url } height={100}></img></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

}

export default ModelList;