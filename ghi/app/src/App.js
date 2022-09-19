import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage';
import AutomobileList from './Inventory/AutomobileList';
import AutomobileForm from './Inventory/AutomobileForm';
import ManufacturerList from './Inventory/ManufacturerList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ModelList from './Inventory/ModelList';
import AppointmentList from './Service/AppointmentList';
import AppointmentForm from './Service/AppointmentForm';
import AppointmentHistory from './Service/AppointmentHistory';
import TechnicianForm from './Service/TechnicianForm';
import ModelForm from './Inventory/ModelForm';
import Nav from './components/Nav';
import SalesPersonForm from './Sales/SalesPersonForm';
import CustomerForm from './Sales/CustomerForm';
import SalesRecordForm from './Sales/SalesRecordForm';
import SalesRecordList from './Sales/SalesRecordList';
import SalesRecordFiltered from './Sales/SalesRecordFiltered';
import Footer from "./components/Footer";
import './index.css';


// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state={
//       appointments: [],
//       sales_records: [],
//       autos: [],
//       models: [],
//       manufacturers: []
//     };
//     this.loadAppointments = this.loadAppointments.bind(this);
//     this.loadSalesRecords = this.loadSalesRecords.bind(this);
//     this.loadAutomobiles = this.loadAutomobiles.bind(this);
//     this.loadVehicleModels = this.loadVehicleModels.bind(this);
//     this.loadManufacturers = this.loadManufacturers.bind(this);
//     this.cancelAppointment = this.cancelAppointment.bind(this);
//     this.finishAppointment = this.finishAppointment.bind(this);
//     this.deleteManufacturer = this.deleteManufacturer.bind(this);
//     this.deleteModel = this.deleteModel.bind(this);
//     this.deleteAutomobile = this.deleteAutomobile.bind(this);
//     }
  
//   async componentDidMount() {
//     this.loadAppointments()
//     this.loadSalesRecords()
//     this.loadAutomobiles()
//     this.loadVehicleModels()
//     this.loadManufacturers()
//   }

//   async loadAppointments() {
//     const response = await fetch(`${process.env.REACT_APP_SERVICE_API}api/appointments/`);
//     if(response.ok) {
//       const data = await response.json();
//       this.setState({appointments: data.appointments});
//     }
//   }

//   async loadSalesRecords() {
//     const response = await fetch(`${process.env.REACT_APP_SALES_API}/api/sales-records/`);
//     if(response.ok) {
//       const data = await response.json();
//       this.setState({sales_records: data.sales_records});
//     }
//   }

//   async loadAutomobiles() {
//     const response = await fetch(`${process.env.REACT_APP_INVENTORY}/api/automobiles/`);
//     if(response.ok) {
//       const data = await response.json();
//       this.setState({autos: data.autos});
//     }
//   }

//   async loadVehicleModels() {
//     const response = await fetch(`${process.env.REACT_APP_INVENTORY}/api//models/`);
//     if(response.ok) {
//       const data = await response.json();
//       this.setState({models: data.models});
//     }
//   }

//   async loadManufacturers() {
//     const response = await fetch(`${process.env.REACT_APP_INVENTORY}/api/manufacturers/`);
//     if(response.ok) {
//       const data = await response.json();
//       this.setState({manufacturers: data.manufacturers})
//     }
//   }

//   async cancelAppointment(appointment) {
//     if (window.confirm("Do you want to cancel this appointment?")) {
//       const appointmentUrl = `${process.env.REACT_APP_SERVICE}/api/appointments/${appointment.id}/canceled/`
//       const fetchConfig = {
//         method: "put",
//       }
//     const response = await fetch(appointmentUrl, fetchConfig);
//     if (response.ok) {
//         const newAppointments = this.state.appointments.filter((app) => appointment.id !== app.id)
//         this.setState({appointments: newAppointments})
//     }
//     } 
//   }

//   async finishAppointment(appointment) {
//     if (window.confirm("Confirm appointment is finished")) {
//       const appointmentUrl = `${process.env.REACT_APP_SERVICE}/api/appointments/${appointment.id}/finished/`
//       const fetchConfig = {
//         method: "put",
//       }
//     const response = await fetch(appointmentUrl, fetchConfig);
//     if (response.ok) {
//       const newAppointments = this.state.appointments.filter((app) => appointment.id !== app.id)
//       this.setState({appointments: newAppointments})
//     }
//     }
//   }

//   async deleteManufacturer (manufacturer) {
//     if (window.confirm("Are you sure you want to delete this?")) {
//       const manufacturerUrl = `${process.env.REACT_APP_INVENTORY}/api/manufacturers/${manufacturer.id}/`
//       const fetchConfig = {
//         method: "delete",
//       }
//     const response = await fetch(manufacturerUrl, fetchConfig);
//     if (response.ok) {
//       const newManufacturers = this.state.manufacturers.filter((man) => manufacturer.id !== man.id)
//       this.setState({manufacturers: newManufacturers})
//     }
//     }
//   }

//   async deleteModel (model) {
//     if (window.confirm("Are you sure you want to delete this?")) {
//       const modelUrl = `${process.env.REACT_APP_INVENTORY}/api/models/${model.id}/`
//       const fetchConfig = {
//         method: "delete",
//       }
//     const response = await fetch(modelUrl, fetchConfig);
//     if (response.ok) {
//       const newModels = this.state.models.filter((mod) => model.id !== mod.id)
//       this.setState({models: newModels})
//     }
//     }
//   }

//   async deleteAutomobile (auto) {
//     if (window.confirm("Are you sure you want to delete this?")) {
//       const autoUrl = `${process.env.REACT_APP_INVENTORY}/api/automobiles/${auto.id}/`
//       const fetchConfig = {
//         method: "delete",
//       }
//       const response = await fetch(autoUrl, fetchConfig);
//       if (response.ok) {
//         const newAutos = this.state.models.filter((car) => car.id !== auto.id)
//         this.setState({autos: newAutos})
//       }
//     }
//   }

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="manufacturers"> 
          <Route path="" element={<ManufacturerList /> } />
          <Route path="new" element={<ManufacturerForm />} />
        </Route>
        <Route path="models">
          <Route path="" element={<ModelList />} />
          <Route path="new" element={<ModelForm />} />
        </Route>
        <Route path="automobiles">
          <Route path="" element={<AutomobileList />} />
          <Route path="new" element={<AutomobileForm />} />
        </Route> 
        <Route path="appointments">
          <Route path="" element={<AppointmentList />} />
          <Route path="new" element={<AppointmentForm />} />
          <Route path="details" element={<AppointmentHistory />} />
        </Route>
        <Route path="technicians">
          <Route path="new" element={<TechnicianForm />} />
        </Route>
        <Route path="sales-person">
          <Route path="new" element={<SalesPersonForm />} />
        </Route>
        <Route path="customers">
          <Route path="new" element={<CustomerForm />} />
        </Route>
        <Route path="sales-records">
          <Route path="" element={<SalesRecordList />} />
          <Route path="filtered" element={<SalesRecordFiltered />} />
          <Route path="new" element={<SalesRecordForm />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
