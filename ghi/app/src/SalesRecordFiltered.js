import React, { useState, useEffect } from 'react'

export default function SalesRecordList({ sales_records }) {

    const [search, setSearch] = useState("");
    useEffect(() => { }, [])
    return (
        <>
            <div className="appointment-list">
                <h1>Filtered Sales Records</h1>
                <div className="pb row">
                    <form id="form_search" name="form_search" method="get" action="" className="form-inline">
                        <div className="form-group">
                            <div className="input-group">
                                <input onChange={event => setSearch(event.target.value)} className="form-control" type="text" placeholder="Search by Sales Person" />
                            </div>
                        </div>
                    </form>
                </div>

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
                        {sales_records
                            .filter(record => record.sales_person.name.includes(search))
                            ?.map(record => {
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