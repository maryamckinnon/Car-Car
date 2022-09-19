import React from 'react';

export default function SalesRecordList({ sales_records }) {
    return (
        <>
        <div className="appointment-list">
            <h1>Sales Records</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Customer</th>
                            <th>Automobile VIN</th>
                            <th>Sales Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales_records?.map(record => {
                            return (
                                <tr key={record.id}>
                                <td>{record.sales_person.name}</td>
                                <td>{record.customer.name}</td>
                                <td>{record.automobile.vin}</td>
                                <td>{record.sales_price}</td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
        </div>
        </>
    )
}