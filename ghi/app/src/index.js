import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


async function loadManufacturers() {
  const response = await fetch("http://localhost:8100/api/manufacturers/");
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App manufacturers={data.manufacturers} />
      </React.StrictMode>
    );
  } else {
    console.log(response);
  }
}

async function loadAppointments() {
  const response = await fetch("http://localhost:8080/api/appointments/");
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App appointments={data.appointments} />
      </React.StrictMode>
    );
  } else {
    console.log(response);
  }
}


async function loadTechnicians() {
  const response = await fetch("http://localhost:8080/api/technicians/");
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App technicians={data.technicians} />
      </React.StrictMode>
    );
  } else {
    console.log(response);
  }
}

loadAppointments();
loadTechnicians();