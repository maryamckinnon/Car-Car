import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import MainPage from './MainPage';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import ModelList from './ModelList';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import AppointmentHistory from './AppointmentHistory';
import TechnicianForm from './TechnicianForm';
import ModelForm from './ModelForm';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';
import SalesRecordForm from './SalesRecordForm';
import SalesRecordList from './SalesRecordList';
import SalesRecordFiltered from './SalesRecordFiltered';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      appointments: [],
      sales_records: [],
      autos: [],
      models: [],
      manufacturers: []
    };
    this.loadAppointments = this.loadAppointments.bind(this);
    this.loadSalesRecords = this.loadSalesRecords.bind(this);
    this.loadAutomobiles = this.loadAutomobiles.bind(this);
    this.loadVehicleModels = this.loadVehicleModels.bind(this);
    this.loadManufacturers = this.loadManufacturers.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.finishAppointment = this.finishAppointment.bind(this);
    this.deleteManufacturer = this.deleteManufacturer.bind(this);
    this.deleteModel = this.deleteModel.bind(this);
    this.deleteAutomobile = this.deleteAutomobile.bind(this);
    }
  
  async componentDidMount() {
    this.loadAppointments()
    this.loadSalesRecords()
    this.loadAutomobiles()
    this.loadVehicleModels()
    this.loadManufacturers()
  }

  async loadAppointments() {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if(response.ok) {
      const data = await response.json();
      this.setState({appointments: data.appointments});
    }
  }

  async loadSalesRecords() {
    const response = await fetch("http://localhost:8090/api/sales-records/");
    if(response.ok) {
      const data = await response.json();
      this.setState({sales_records: data.sales_records});
    }
  }

  async loadAutomobiles() {
    const response = await fetch("http://localhost:8100/api/automobiles/");
    if(response.ok) {
      const data = await response.json();
      this.setState({autos: data.autos});
    }
  }

  async loadVehicleModels() {
    const response = await fetch("http://localhost:8100/api/models/");
    if(response.ok) {
      const data = await response.json();
      this.setState({models: data.models});
    }
  }

  async loadManufacturers() {
    const response = await fetch("http://localhost:8100/api/manufacturers/");
    if(response.ok) {
      const data = await response.json();
      this.setState({manufacturers: data.manufacturers})
    }
  }

  async cancelAppointment(appointment) {
    if (window.confirm("Do you want to cancel this appointment?")) {
      const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}/canceled/`
      const fetchConfig = {
        method: "put",
      }
    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
        const newAppointments = this.state.appointments.filter((app) => appointment.id !== app.id)
        this.setState({appointments: newAppointments})
    }
    } 
  }

  async finishAppointment(appointment) {
    if (window.confirm("Confirm appointment is finished")) {
      const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}/finished/`
      const fetchConfig = {
        method: "put",
      }
    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      const newAppointments = this.state.appointments.filter((app) => appointment.id !== app.id)
      this.setState({appointments: newAppointments})
    }
    }
  }

  async deleteManufacturer (manufacturer) {
    if (window.confirm("Are you sure you want to delete this?")) {
      const manufacturerUrl = `http://localhost:8100/api/manufacturers/${manufacturer.id}/`
      const fetchConfig = {
        method: "delete",
      }
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      const newManufacturers = this.state.manufacturers.filter((man) => manufacturer.id !== man.id)
      this.setState({manufacturers: newManufacturers})
    }
    }
  }

  async deleteModel (model) {
    if (window.confirm("Are you sure you want to delete this?")) {
      const modelUrl = `http://localhost:8100/api/models/${model.id}/`
      const fetchConfig = {
        method: "delete",
      }
    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
      const newModels = this.state.models.filter((mod) => model.id !== mod.id)
      this.setState({models: newModels})
    }
    }
  }

  async deleteAutomobile (auto) {
    if (window.confirm("Are you sure you want to delete this?")) {
      const autoUrl = `http://localhost:8100/api/automobiles/${auto.id}/`
      const fetchConfig = {
        method: "delete",
      }
      const response = await fetch(autoUrl, fetchConfig);
      if (response.ok) {
        const newAutos = this.state.models.filter((car) => car.id !== auto.id)
        this.setState({autos: newAutos})
      }
    }
  }



  render() {
    return (
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers"> 
            <Route path="" element={<ManufacturerList manufacturers={this.state.manufacturers} delete={this.deleteManufacturer}/> } />
            <Route path="new" element={<ManufacturerForm load={this.loadManufacturers}/>} />
          </Route>
          <Route path="models">
            <Route path="" element={<ModelList models={this.state.models} delete={this.deleteModel}/>} />
            <Route path="new" element={<ModelForm load={this.loadVehicleModels}/>} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList autos={this.state.autos} delete={this.deleteAutomobile} />} />
            <Route path="new" element={<AutomobileForm load={this.loadAutomobiles}/>} />
          </Route> 
          <Route path="appointments">
            <Route path="" element={<AppointmentList appointments={this.state.appointments} 
            cancel={this.cancelAppointment} finish={this.finishAppointment} />} />
            <Route path="new" element={<AppointmentForm load={this.loadAppointments}/>} />
            <Route path="details" element={<AppointmentHistory appointments={this.state.appointments}/>} />
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
            <Route path="" element={<SalesRecordList sales_records={this.state.sales_records}/>} />
            <Route path="filtered" element={<SalesRecordFiltered sales_records={this.state.sales_records}/>} />
            <Route path="new" element={<SalesRecordForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
