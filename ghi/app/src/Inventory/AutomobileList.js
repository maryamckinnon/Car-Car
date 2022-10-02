import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function AutomobileList() {

    const [data, setData] = useState([]);
    
    function Redirect() {
        const navigate = useNavigate();
        function handleClick() {
            navigate('/automobiles/new')
        }
        return (
            <div>
                <button className='btn btn-primary' onClick={handleClick}>Add new automobile</button>
            </div>
        )
    }

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
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                </tr>
            </thead>
            <tbody>
                {data.map(automobile => {
                    return (
                        <tr key={automobile.id}>
                            <td>{ automobile.vin }</td>
                            <td>{ automobile.color }</td>
                            <td>{ automobile.year }</td>
                            <td>{ automobile.model.name }</td>
                            <td>{ automobile.model.manufacturer.name }</td>
                        </tr>
                        );
                })}
            </tbody>
        </table>
        <Redirect />
        </div>
    );
}

export default AutomobileList;