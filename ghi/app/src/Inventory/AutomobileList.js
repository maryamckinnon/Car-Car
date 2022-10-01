import React from 'react';

function AutomobileList() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
      const url = `${process.env.REACT_APP_INVENTORY_API}/api/automobiles/`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json['autos']))
        .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
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
        </div>
    );
}

export default AutomobileList;