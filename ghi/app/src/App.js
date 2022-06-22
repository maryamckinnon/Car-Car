import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      appointments: [],
      autos: [],
      models: [],
      manufacturers: []
    };
    this.loadAppointments = this.loadAppointments.bind(this);
    this.loadAutomobiles = this.loadAutomobiles.bind(this);
    this.loadVehicleModels = this.loadVehicleModels.bind(this);
    this.loadManufacturers = this.loadManufacturers.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.finishAppointment = this.finishAppointment.bind(this);
    }
  
  async componentDidMount() {
    this.loadAppointments()
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

  async loadAutomobiles() {
    const response = await fetch("http://localhost:8100/api/automobiles/");
    if(response.ok) {
      const data = await response.json();
      this.setState({automobiles: data.automobiles});
    }
  }

  async loadVehicleModels() {
    const response = await fetch("http://localhost:8100/api/models/");
    if(response.ok) {
      const data = await response.json();
      this.setState({vehicleModels: data.vehicleModels});
    }
  }

  async loadManufacturers() {
    const response = await fetch("http://localhost:8100/api/models");
    if(response.ok) {
      const data = await response.json();
      this.setState({manufacturers: data.manufacturers})
    }
  }

  async cancelAppointment(e) {
    const filteredAppointments = this.state.appointments.filter(appointment => appointment !== e.target.value)
    this.setState({appointment: filteredAppointments});
    }
  }

  async finishAppointment() {

  }



  render() {
    return (
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers"/> 
            <Route path="" element={<ManufacturerList manufacturers={this.state.manufacturers}/>}>
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route path="" element={<ModelList models={this.state.models}/> } />
            <Route path="new" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList autos={this.state.autos}/>} />
            <Route path="new" element={<AutomobileForm />} />
          </Route> 
          <Route path="appointments">
            <Route path="" element={<AppointmentList appointments={this.state.appointments}/>} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="details" element={<AppointmentHistory appointments={this.state.appointments}/>} />
          </Route>
          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}


export default App;
