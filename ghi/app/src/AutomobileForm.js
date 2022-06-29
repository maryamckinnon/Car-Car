import React from 'react';

class AutomobileForm extends React.Component {
    initialState = {
      vin: '',
      color: '',
      year: '',
    }
    constructor(props) {
      super(props)
      this.state = {
        ...this.initialState,
        models: [],
      };
      this.handleChange = this.handleChange.bind(this);
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

    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({[name]: value})
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      delete data.models

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
          console.log(newAuto)

          this.setState({...this.initialState});
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
                      <input onChange={this.handleChange} placeholder="Vin" 
                      required type="text" name="vin" 
                      id="vin" className="form-control" value={this.state.vin}/>
                      <label htmlFor="vin">VIN</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={this.handleChange} placeholder="Color" 
                      required type="text" name="color" 
                      id="color" className="form-control" value={this.state.color}/>
                      <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={this.handleChange} placeholder="Year" required 
                      type="text" name="year" id="year" className="form-control" value={this.state.year}/>
                      <label htmlFor="year">Year</label>
                  </div>
                  <div className="mb-3">
                      <select onChange={this.handleChange} required id="model" 
                      className="form-select" name="model_id" value={this.state.model}>
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