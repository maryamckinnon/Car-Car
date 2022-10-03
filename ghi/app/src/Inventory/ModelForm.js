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
          <div className='row'>
              <form 
                onSubmit={this.handleSubmit} 
                id="model-form"
              >
                <div className="input-group d-inline-flex align-items-center w-auto">
                  <input 
                    onChange={this.handleNameChange} 
                    placeholder="Name" 
                    required type="text" 
                    name="name" 
                    id="name" 
                    className="form-control" 
                    value={this.state.name}
                  />
                </div>                  
                <div className="input-group d-inline-flex align-items-center w-auto">
                    <select 
                      required id="manufacturer" 
                      className="form-select" 
                      name="manufacturer" 
                      onChange={this.handleManufacturerIdChange} 
                      value={this.state.manufacturer_id}
                    >
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
                <div className="input-group d-inline-flex align-items-center w-auto">
                    <input 
                      onChange={this.handlePictureUrlChange} 
                      placeholder="Picture URL" 
                      required type="url" 
                      name="picture url" 
                      id="picture url" 
                      className="form-control" 
                      value={this.state.picture_url}
                    />
                  </div>
                  <button className="btn btn-primary">Add</button>
                </form>
              </div>
        );
    }
}

export default ModelForm;