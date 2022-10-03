import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AutomobileForm from './AutomobileForm';

function AutomobileList() {

    const [data, setData] = useState([]);

    useEffect(() => {
      const url = 'http://localhost:8100/api/automobiles/';

      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json['autos']))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
    }, [data]);

    return (
        <div>
        <h1>Automobile Inventory</h1>
        <p>Inventory Count: {data.length}</p>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>VIN</th>
                </tr>
            </thead>
            <tbody>
                {data.map(automobile => {
                    return (
                        <tr key={automobile.id}>
                            <td>{ automobile.year }</td>
                            <td>{ automobile.model.manufacturer.name }</td>
                            <td>{ automobile.model.name }</td>
                            <td>{ automobile.color }</td>
                            <td>{ automobile.vin }</td>
                        </tr>
                        );
                })}
            </tbody>
        </table>
        <AutomobileForm />
        </div>
    );
}

export default AutomobileList;