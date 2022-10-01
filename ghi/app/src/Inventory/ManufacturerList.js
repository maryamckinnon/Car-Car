import React from 'react';
import ManufacturerForm from "./ManufacturerForm";


function ManufacturerList() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
      const url = `${process.env.REACT_APP_INVENTORY_API}/api/manufacturers/`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json['manufacturers']))
        .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
    }, [data]);

    return (
        <>
        <h1> Manufacturers </h1>
        <table className="table" style={{width:'400px'}}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map(manufacturer => {
                    return (
                        <tr key={ manufacturer.id }>
                            <td>{ manufacturer.name }</td>
                            <td><button className="btn btn-danger" onClick={() => data.delete(manufacturer)}>X</button></td>
                        </tr>
                        
                    );
                })}
            </tbody>
        </table>
        <ManufacturerForm />
        </>
    );
}

export default ManufacturerList;