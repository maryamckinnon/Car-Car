import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// reportWebVitals()

// (async () => {
//   try {
//     const urls = [
//       "http://localhost:8100/api/manufacturers/",
//       "http://localhost:8100/api/automobiles/",
//       "http://localhost:8100/api/models/",
//       "http://localhost:8080/api/appointments/",
//       "http://localhost:8080/api/technicians/",
      
//     ];

//     const requests = urls.map((url) => fetch(url));
//     const responses = await Promise.all(requests);
//     const errors = responses.filter((response) => !response.ok);

//     if (errors.length > 0) {
//       throw errors.map((response) => Error(response.statusText));
//     }

//     const json = responses.map((response) => response.json());
//     const data = await Promise.all(json);

//     data.forEach((datum) => console.log("string", datum));
//     root.render(
//       <React.StrictMode>
//         <App
//           manufacturers={data}
//           appointments={data} 
//           autos={data}
//           technicians={data}
//           models={data}
//           />
//       </React.StrictMode>
//     )
//   }
//   catch (errors) {
//     errors.forEach((error) => console.error(error));
//   }
// })();

// async function loadModels() {
//   const response = await fetch("http://localhost:8100/api/models/");
//   if (response.ok) {
//     const data = await response.json();
//     root.render(
//       <React.StrictMode>
//         <App models={data.models} />
//       </React.StrictMode>
//     );
//   } else {
//     console.log(response);
//   }
// }

// async function loadManufacturers() {
//   const response = await fetch("http://localhost:8100/api/manufacturers/");
//   if (response.ok) {
//     const data = await response.json();
//     root.render(
//       <React.StrictMode>
//         <App manufacturers={data.manufacturers} />
//       </React.StrictMode>
//     );
//   } else {
//     console.log(response);
//   }
// }

// async function loadAppointments() {
//   const response = await fetch("http://localhost:8080/api/appointments/");
//   if (response.ok) {
//     const data = await response.json();
//     root.render(
//       <React.StrictMode>
//         <App appointments={data.appointments} />
//       </React.StrictMode>
//     );
//   } else {
//     console.log(response);
//   }
// }

// async function loadAutomobiles() {
//   const response = await fetch("http://localhost:8100/api/automobiles/");
//   if (response.ok) {
//     const data = await response.json();
//     root.render(
//       <React.StrictMode>
//         <App autos={data.autos} />
//       </React.StrictMode>
//     );
//   } else {
//     console.log(response);
//   }
// }

// async function loadTechnicians() {
//   const response = await fetch("http://localhost:8080/api/technicians/");
//   if (response.ok) {
//     const data = await response.json();
//     root.render(
//       <React.StrictMode>
//         <App technicians={data.technicians} />
//       </React.StrictMode>
//     );
//   } else {
//     console.log(response);
//   }
// }

// loadModels();
// loadManufacturers();
// loadAutomobiles();
// loadAppointments();
// loadTechnicians();