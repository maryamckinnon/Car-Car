import React, { useEffect, useState } from "react";
import ManufacturerForm from "./ManufacturerForm";
import Button from "@mui/material/Button";

function ManufacturerList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_INVENTORY_API}/api/manufacturers/`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json["manufacturers"]))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {}, [data]);

  async function deleteManufacturer(id) {
    const fetchConfig = {
      method: "DELETE",
    };
    const url = `${process.env.REACT_APP_INVENTORY_API}/api/manufacturers/${id}`;
    const response = fetch(url, fetchConfig);
    if (response.ok) {
      setData(data.filter((manufacturer) => manufacturer.id !== id));
    }
    window.location.reload();
  }

  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <h1> Manufacturers </h1>
      <table className="table" style={{ width: "400px", textAlign: "center" }}>
        <thead></thead>
        <tbody>
          {sortedData.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "60px",
                    borderBottom: "none",
                  }}
                >
                  {manufacturer.name}
                </td>
                <td style={{ textAlign: "center", borderBottom: "none" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => deleteManufacturer(manufacturer.id)}
                  >
                    x
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="manufacturer-form" style={{ paddingTop: "30px" }}>
        <ManufacturerForm />
      </div>
    </>
  );
}

export default ManufacturerList;
