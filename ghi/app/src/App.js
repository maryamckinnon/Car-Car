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
import ModelListCustomer from './Inventory/ModelListCustomer';


function App() {
  // const domain = /https:\/\/[^/]+/;
  // const basename = process.env.PUBLIC_URL.replace(domain, '');

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
          <Route path="customer" element={<ModelListCustomer />} />
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
