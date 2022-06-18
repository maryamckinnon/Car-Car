import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage';
import AutomobileList from './AutomobileList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AppointmentList from './AppointmentList';
import TechnicianForm from './TechnicianForm';
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

          <Route path="new">
            <Route path="manufacturers" element={<ManufacturerForm />} />
          </Route>

          <Route path="automobiles" element={<AutomobileList data={props}/>} />

          <Route path="appointments" element={<AppointmentList data={props}/>} />
          
          <Route path="new">
            <Route path="technicians" element={<TechnicianForm />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
