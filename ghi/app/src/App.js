import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage';
import AutomobileList from './AutomobileList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import TechnicianForm from './TechnicianForm';
import ModelForm from './ModelForm';
import Nav from './Nav';

function App(props) {
  // if (props.appointments === undefined) {
  //   return null;
  // }

  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList data={props}/>} /> 
          <Route path="manufacturers">
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route path="new" element={<ModelForm data={props}/>} />
          </Route>
          <Route path="automobiles" element={<AutomobileList data={props}/>} />
          <Route path="appointments" element={<AppointmentList data={props}/>} />
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
          </Route>
          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
