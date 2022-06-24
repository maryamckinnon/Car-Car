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
      this.handleModelIdChange = this.handleModelIdChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
      const url = 'http://localhost:8100/api/models/';
    
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        this.setState({models: data.models});
      }
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

    handleModelIdChange(event) {
      const value = event.target.value;
      this.setState({modelId: value})
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      data.model_id = data.modelId;
      delete data.modelId;
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
            model_id: '',
          };
          this.setState(cleared);
          this.props.load();
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
                      <select onChange={this.handleModelIdChange} required id="model" 
                      className="form-select" name="model" value={this.state.model_id}>
                      <option value="">Model</option>
                      {this.state.models.map(model => {
                          return (
                              <option key={model.id} value={model.id}> {model.name} </option>
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