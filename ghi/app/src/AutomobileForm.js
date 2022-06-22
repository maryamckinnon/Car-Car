import React from 'react';

class AutomobileForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        vin: '',
        color: '',
        year: '',
        models: [],
      };
      this.handleVinChange = this.handleVinChange.bind(this);
      this.handleColorChange = this.handleColorChange.bind(this);
      this.handleYearChange = this.handleYearChange.bind(this);
      this.handleModelChange = this.handleModelChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleVinChange(event) {
      const value = event.target.value;
      this.setState({vin: value})
    }

    handleColorChange(event) {
      const value = event.target.value;
      this.setState({color: value})
    }

    handleYearChange(event) {
      const value = event.target.value;
      this.setState({year: value})
    }

    handleModelChange(event) {
      const value = event.target.value;
      this.setState({model: value})
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      delete data.models
      console.log("data", data);

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
          const newAuto = await response.json();
          console.log(newAuto);

          const cleared = {
            vin: '',
            color: '',
            year: '',
            models: [],
          };
          this.setState(cleared);
        }
    }
    
    render() {
        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
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
                      className="form-select" name="model" value={this.state.model}>
                      <option value="">Model</option>
                      {this.state.models.map(model => {
                          return (
                              <option key={model.id} value={model.href}> {model.name} </option>
                          );
                      })}
                      </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
          </div>
          </div>
      </div>
        );
    }
}

export default AutomobileForm;