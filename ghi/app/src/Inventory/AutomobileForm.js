import React from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect() {
  const navigate = useNavigate();
  function handleClick() {
      navigate('/automobiles/')
  }
  return (
      <div>
          <button className='btn btn-primary' onClick={handleClick}>Create</button>
      </div>
  )
}

class AutomobileForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        vin: '',
        color: '',
        year: '',
        models: [],
        manufacturers: [],
        showSuccess: "d-none",
        showForm: "shadow p-4 mt-4",
      };
      this.handleReset = this.handleReset.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleVinChange = this.handleVinChange.bind(this);
      this.handleYearChange = this.handleYearChange.bind(this);
      this.handleColorChange = this.handleColorChange.bind(this);
      this.handleModelChange = this.handleModelChange.bind(this);
      this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
      const modelUrl = 'http://localhost:8100/api/models/';
      const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
      const modelResponse = await fetch(modelUrl);
      const manufacturerResponse = await fetch(manufacturerUrl);

      if (modelResponse.ok && manufacturerResponse.ok) {
        const models = await modelResponse.json();
        const manufacturers = await manufacturerResponse.json();
        this.setState({
            models: models.models,
            manufacturers: manufacturers.manufacturers,
        });
      } else {
        console.error('invalid request')
      }
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value.toUpperCase()});
    }

    handleYearChange(event) {
        const value = event.target.value;
        this.setState({year: value});
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value});
    }

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({model_id: value});
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer: value});
    }

    handleReset(event) {
        this.setState({
            showSuccess: 'd-none',
            showForm: 'shadow p-4 mt-4',
        });
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      delete data.models;
      delete data.showForm;
      delete data.manufacturers;
      delete data.manufacturer;
      delete data.showSuccess;

      const autoUrl = 'http://localhost:8100/api/automobiles/';
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
      };
        
      const response = await fetch(autoUrl, fetchConfig);
      if (response.ok) {
          const cleared = {
            vin: '',
            color: '',
            year: '',
            model_id: '',
            manufacturer: '',
            showSuccess: '',
            showForm: 'shadow p-4 mt-4 d-none',
            message: 'Automobile has been added to inventory'
          }
          this.setState(cleared);
      } else {
        console.error('invalid request')
      }
    }
    
    render() {
        return (
          <div className="row">
            <div className="offset-3 col-6">
            <div className={this.state.showSuccess}>
                        <div className="alert alert-success mt-4" role="alert">
                            {this.state.message}
                        </div>
                        <button className="btn btn-outline-success" onClick={this.handleReset}>
                            Add another
                        </button>
                    </div>
                    <div className={this.state.showForm}>
                <h1>Add an automobile to inventory</h1>
                  <form onSubmit={this.handleSubmit} id="create-auto-form">
                  <div className="form-floating mb-3">
                      <input onChange={this.handleVinChange} placeholder="Vin" 
                      required type="text" name="vin" 
                      id="vin" className="form-control" value={this.state.vin}/>
                      <label htmlFor="vin">VIN</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={this.handleColorChange} placeholder="Color" 
                      required type="text" name="color" 
                      id="color" className="form-control" value={this.state.color}/>
                      <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={this.handleYearChange} placeholder="Year" required 
                      type="text" name="year" id="year" className="form-control" value={this.state.year}/>
                      <label htmlFor="year">Year</label>
                  </div>
                  <div className="mb-3">
                      <select onChange={this.handleModelChange} required id="model" 
                      className="form-select" name="model_id" value={this.state.model_id}>
                      <option value="">Model</option>
                      {this.state.models.map(model => {
                          return (
                              <option key={model.id} value={model.id}> {model.name} </option>
                          );
                      })}
                      </select>
                  </div>
                  <button className="btn btn-primary"><Redirect />Create</button>
                </form>
          </div>
          </div>
          
      </div>
        );
    }
}

export default AutomobileForm;