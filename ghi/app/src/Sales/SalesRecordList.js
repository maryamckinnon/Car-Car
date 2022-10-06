import React, { useState, useEffect } from 'react';

function SalesRecordList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8090/api/sales-records/';

        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json['sales_record']))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
    }, [data]);

    return (
        <>
        <div className="appointment-list">
            <h1>Sales Records</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Sales Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(sale => {
                            return (
                                <tr key={sale.id}>
                                <td>{sale.sales_person.name}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.sales_price}</td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
        </div>
        </>
    )
}

export default SalesRecordList;