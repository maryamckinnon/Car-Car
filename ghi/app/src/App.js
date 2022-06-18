import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage';
import ManufacturerList from './ManufacturerList';
import AppointmentList from './AppointmentList';
import TechnicianForm from './TechnicianForm';
import Nav from './Nav';

function App(props) {

  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList data={props}/>} />
          <Route path="appointments" element={<AppointmentList data={props}/>} />
          <Route path="new">
            <Route path="technicians" element={<TechnicianForm data={props}/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
