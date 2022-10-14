import React, { useState, useEffect } from 'react';

function SalesRecordList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const url = `${process.env.REACT_APP_SALES_API}/api/sales-records/`;

        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json['sales_records']))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
    }, [data]);

    console.log(data)
    return (
        <>
        <div className="appointment-list">
            <h1>Sales Records</h1>
                <table className="table table-striped table-hover" style={{backgroundColor:'#f5f5f5', marginBottom:'50px', borderRadius:10}}>
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Sales Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(sales_record => {
                            return (
                                <tr key={sales_record.id}>
                                <td>{sales_record.sales_person.name}</td>
                                <td>{sales_record.customer.name}</td>
                                <td>{sales_record.automobile.vin}</td>
                                <td>$ { new Intl.NumberFormat().format(sales_record.price) }</td>
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