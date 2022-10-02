import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function AutomobileForm({ addAutomobile }) {
  const [modelData, setModelData] = useState([]);
  const [vin, setVin] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [models, setModels] = useState([]);
  const handleSubmit = (e) => {
    addAutomobile([vin, color, year, models])
    e.preventDefault();
    return (
      <Navigate to='/automobiles/' />
    )
  }

  useEffect(() => {
    const url = 'http://localhost:8100/api/models/';

    fetch(url)
      .then((response) => response.json())
      .then((json) => setModelData(json['models']))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
  }, [modelData]);

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="form-outline mb-2">
    <br />
    <form onSubmit={e => { handleSubmit(e) }}>
    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
      <label>Automobile Form</label>
      <br />
      <div className="form-outline mb-2">
        <input
          onChange={(e) => setVin(e.target.value)}
          required type='text'
          id='vin'
          className="form-control form-control-md"
          placeholder='VIN'
          value={vin}
        />
      </div>
      <div className="form-outline mb-2">
        <input
          onChange={(e) => setColor(e.target.value)}
          required type='text'
          id='color'
          className="form-control form-control-md"
          placeholder='Color'
          value={color}
        />
      </div>
      <div className="form-outline mb-2">
        <input
          onChange={(e) => setYear(e.target.value)}
          required type='text'
          id='year'
          className="form-control form-control-md"
          placeholder='Year'
          value={year}
        />
      </div>
      <div className="form-outline mb-2">
        <select required id="model" 
        className="form-select" 
        name="model" 
        onChange={(e) => setModels(e.target.value)} 
        >
        <option value="">Choose a model</option>
        {modelData.map(model => {
          return (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          );
          })}
        </select>
      </div>
      <input
        type='submit'
        value='Add automobile'
      />
    </div>
    </form>
    </div>
    </div>
    </div>
    </section>
  )
}

export default AutomobileForm;