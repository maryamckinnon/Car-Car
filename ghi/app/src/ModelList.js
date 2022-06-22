import React from 'react';

function ModelList(props) {
    console.log('beginning', props)

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {console.log('just before map', props.models)}
                {props.models && props.models.map(model => {
                    return (
                        <tr key={ model.id }>
                            <td>{ model.name }</td>
                            <td>{ model.manufacturer.name }</td>
                            <td><img src={ model.picture_url }></img></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

}

export default ModelList;