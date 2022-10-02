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
      <button
        type="button"
        className="btn btn-primary"
      >
      Add
      </button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </section>
  )
}

export default AutomobileForm;


// function Redirect() {
//   const navigate = useNavigate();
  
//   function handleClick() {
//       navigate('/automobiles/')
//   }
//   return (
//       <div>
//           <button className='btn btn-primary' onClick={handleClick}>Create</button>
//       </div>
//   )
// }

// class AutomobileForm extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         vin: '',
//         color: '',
//         year: '',
//         models: [],
//         manufacturers: [],
//       };
//       this.handleReset = this.handleReset.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//       this.handleVinChange = this.handleVinChange.bind(this);
//       this.handleYearChange = this.handleYearChange.bind(this);
//       this.handleColorChange = this.handleColorChange.bind(this);
//       this.handleModelChange = this.handleModelChange.bind(this);
//       this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
//     }

//     async componentDidMount() {
//       const modelUrl = 'http://localhost:8100/api/models/';
//       const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
//       const modelResponse = await fetch(modelUrl);
//       const manufacturerResponse = await fetch(manufacturerUrl);

//       if (modelResponse.ok && manufacturerResponse.ok) {
//         const models = await modelResponse.json();
//         const manufacturers = await manufacturerResponse.json();
//         this.setState({
//             models: models.models,
//             manufacturers: manufacturers.manufacturers,
//         });
//       } else {
//         console.error('invalid request')
//       }
//     }

//     handleVinChange(event) {
//         const value = event.target.value;
//         this.setState({vin: value.toUpperCase()});
//     }

//     handleYearChange(event) {
//         const value = event.target.value;
//         this.setState({year: value});
//     }

//     handleColorChange(event) {
//         const value = event.target.value;
//         this.setState({color: value});
//     }

//     handleModelChange(event) {
//         const value = event.target.value;
//         this.setState({model_id: value});
//     }

//     handleManufacturerChange(event) {
//         const value = event.target.value;
//         this.setState({manufacturer: value});
//     }

//     handleReset(event) {
//         this.setState({
//             showSuccess: 'd-none',
//             showForm: 'shadow p-4 mt-4',
//         });
//     }

//     async handleSubmit(event) {
//       event.preventDefault();
//       const data = {...this.state};
//       delete data.models;
//       delete data.manufacturers;
//       delete data.manufacturer;

//       const autoUrl = 'http://localhost:8100/api/automobiles/';
//       const fetchConfig = {
//           method: 'POST',
//           body: JSON.stringify(data),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//       };
        
//       const response = await fetch(autoUrl, fetchConfig);
//       if (response.ok) {
//           <Route path='/redirect' element={<Navigate to='/automobiles/' /> } />
//           const cleared = {
//             vin: '',
//             color: '',
//             year: '',
//             model_id: '',
//             manufacturer: '',
//             message: 'Automobile has been added to inventory'
//           }
//           this.setState(cleared);
          
//       } else {
//         console.error('invalid request')
//       }
//     }
    
//     render() {
//         return (
//           <div className="row">
//             <div className="offset-3 col-6">
//                 <h1>Add an automobile to inventory</h1>
//                   <form onSubmit={this.handleSubmit} id="create-auto-form">
//                   <div className="form-floating mb-3">
//                       <input onChange={this.handleVinChange} placeholder="Vin" 
//                       required type="text" name="vin" 
//                       id="vin" className="form-control" value={this.state.vin}/>
//                       <label htmlFor="vin">VIN</label>
//                   </div>
//                   <div className="form-floating mb-3">
//                       <input onChange={this.handleColorChange} placeholder="Color" 
//                       required type="text" name="color" 
//                       id="color" className="form-control" value={this.state.color}/>
//                       <label htmlFor="color">Color</label>
//                   </div>
//                   <div className="form-floating mb-3">
//                       <input onChange={this.handleYearChange} placeholder="Year" required 
//                       type="text" name="year" id="year" className="form-control" value={this.state.year}/>
//                       <label htmlFor="year">Year</label>
//                   </div>
//                   <div className="mb-3">
//                       <select onChange={this.handleModelChange} required id="model" 
//                       className="form-select" name="model_id" value={this.state.model_id}>
//                       <option value="">Model</option>
//                       {this.state.models.map(model => {
//                           return (
//                               <option key={model.id} value={model.id}> {model.name} </option>
//                           );
//                       })}
//                       </select>
//                   </div>
//                   <button className="btn btn-primary">Create</button>
//                 </form>
//           </div>
//           </div>
//         );
//     }
// }

// export default AutomobileForm;