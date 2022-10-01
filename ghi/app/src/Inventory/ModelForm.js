import React from 'react';

class ModelForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        showSuccess: "d-none",
        showForm: "shadow p-4 mt-4",
        name: '',
        pictureUrl: '',
        manufacturers: [],
      };
      this.handleReset = this.handleReset.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
      this.handleManufacturerIdChange = this.handleManufacturerIdChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';
      
        const response = await fetch(url);
  
        if (response.ok) {
          const data = await response.json();
          this.setState({manufacturers: data.manufacturers});
        } else {
          console.error('invalid request')
        }
    }

    handleReset(event) {
      this.setState({
          showSuccess: "d-none",
          showForm: "shadow p-4 mt-4",
      });
    }

    handleNameChange(event) {
      const value = event.target.value;
      this.setState({name: value})
    }

    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl: value})
    }

    handleManufacturerIdChange(event) {
        const value = event.target.value;
        this.setState({manufacturerId: value})
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      data.picture_url = data.pictureUrl;
      data.manufacturer_id = data.manufacturerId;
      delete data.showSuccess;
      delete data.showForm;
      delete data.pictureUrl;
      delete data.manufacturerId;
      delete data.manufacturers;

      const modelUrl = 'http://localhost:8100/api/models/';
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
      };
      const response = await fetch(modelUrl, fetchConfig);
      if (response.ok) {
        const cleared = {
          name: '',
          picture_url: '',
          manufacturer_id: '',
          showForm: 'shadow p-4 mt-4 d-none',
          showSuccess: '',
          message: 'Model has been added'
        }
        this.setState(cleared);
      } else {
        console.log(response)
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
                            Add another model
                        </button>
                    </div>
                <div className={this.state.showForm}>
                <h1>Add a vehicle model</h1>
                <form onSubmit={this.handleSubmit} id="create-model-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} placeholder="Name" required type="text" 
                    name="name" id="name" className="form-control" value={this.state.name}/>
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handlePictureUrlChange} placeholder="picture url" 
                    required type="url" name="picture url" 
                    id="picture url" className="form-control" value={this.state.picture_url}/>
                    <label htmlFor="picture url">Picture URL</label>
                  </div>
                  <div className="mb-3">
                    <select required id="manufacturer" className="form-select" name="manufacturer" 
                    onChange={this.handleManufacturerIdChange} value={this.state.manufacturer_id}>
                      <option value="">Choose a manufacturer</option>
                      {this.state.manufacturers.map(manufacturer => {
                        return (
                          <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                          </option>
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

export default ModelForm;