import React from 'react';

function AutomobileList(props) {
    console.log('beginning', props)

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                </tr>
            </thead>
            <tbody>
                {console.log('just before map', props.data.autos)}
                {props.data.autos.map(auto => {
                    return (
                        <tr key={ auto.id }>
                            <td>{ auto.vin }</td>
                            <td>{ auto.color }</td>
                            <td>{ auto.year }</td>
                            <td>{ auto.model.name }</td>
                            <td>{ auto.model.manufacturer.name }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

}

export default AutomobileList;