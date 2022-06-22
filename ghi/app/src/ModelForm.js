import React from 'react';

class ModelForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: '',
        pictureUrl: '',
        manufacturerId: '',
      };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
      this.handleManufacturerIdChange = this.handleManufacturerIdChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // async componentDidMount() {
    //     const url = 'http://localhost:8100/api/manufacturers/';
      
    //     const response = await fetch(url);
  
    //     if (response.ok) {
    //       const data = await response.json();
    //       this.setState({manufacturers: data.manufacturers});
    //     }
    // }

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
      data.manufacturer_id = data.manufacturerId
      delete data.pictureUrl;
      delete data.manufacturerId;
      console.log("data", data);

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
        const newModel = await response.json();
        console.log(newModel);

        const cleared = {
          name: '',
          pictureUrl: '',
          manufacturerId: '',
        }
        this.setState(cleared);
      }
    }
    
    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a vehicle model</h1>
                <form onSubmit={this.handleSubmit} id="create-model-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} placeholder="Name" required type="text" 
                    name="name" id="name" className="form-control" value={this.state.name}/>
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handlePictureUrlChange} placeholder="picture url" 
                    required type="url" name="picture url" 
                    id="picture url" className="form-control" value={this.state.pictureUrl}/>
                    <label htmlFor="picture url">Picture URL</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleManufacturerIdChange} placeholder="manufacturer id" 
                    required type="text" name="manufacturer id" 
                    id="manufacturer id" className="form-control" value={this.state.manufacturerId}/>
                    <label htmlFor="manufacturer id">Manufacturer</label>
                  </div>
                  {/* <div className="mb-3">
                    <select required id="manufacturer" className="form-select" name="manufacturer" 
                    onChange={this.handleManufacturerChange} value={this.state.manufacturer}>
                      <option value="">Choose a manufacturer</option>
                      {this.state.manufacturers.map(manufacturer => {
                        return (
                          <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                          </option>
                        );
                      })}
                    </select>
                  </div> */}
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default ModelForm;