import React, { useState, useEffect } from "react";

export default function SalesRecordFiltered() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const url = `${process.env.REACT_APP_SALES_API}/api/sales-records/`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json["sales_records"]))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {}, [data]);

  return (
    <>
      <h1>Sales Record History</h1>
      <form
        id="form_search"
        name="form_search"
        method="GET"
        action=""
        className="form-inline"
      >
        <div className="form-group">
          <div className="input-group">
            <input
              onChange={(event) => setSearch(event.target.value)}
              className="form-control"
              type="text"
              placeholder="Enter sales person"
            />
          </div>
        </div>
      </form>
      <table
        className="table table-striped table-hover"
        style={{
          backgroundColor: "#f5f5f5",
          marginBottom: "50px",
          borderRadius: 8,
        }}
      >
        <thead>
          <tr>
            <th>Sales Person</th>
            <th>Customer</th>
            <th>Automobile VIN</th>
            <th>Sales Price</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data
              .filter((sales_record) =>
                sales_record.sales_person.name.includes(search)
              )
              .map((sales_record) => {
                return (
                  <tr key={sales_record.id}>
                    <td>{sales_record.sales_person.name}</td>
                    <td>{sales_record.customer.name}</td>
                    <td>{sales_record.automobile.vin}</td>
                    <td>
                      $ {new Intl.NumberFormat().format(sales_record.price)}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </>
  );
}
