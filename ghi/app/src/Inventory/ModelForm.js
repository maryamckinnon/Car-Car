import React from "react";

class ModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccess: "d-none",
      showForm: "shadow p-4 mt-4",
      name: "",
      pictureUrl: "",
      price: "",
      manufacturers: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleManufacturerIdChange =
      this.handleManufacturerIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = `${process.env.REACT_APP_INVENTORY_API}/api/manufacturers/`;

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    } else {
      console.error("invalid request");
    }
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handlePictureUrlChange(event) {
    const value = event.target.value;
    this.setState({ pictureUrl: value });
  }

  handlePriceChange(event) {
    const value = event.target.value;
    this.setState({ price: value });
  }

  handleManufacturerIdChange(event) {
    const value = event.target.value;
    this.setState({ manufacturerId: value });
  }

  async handleSubmit(event) {
    const data = { ...this.state };
    data.picture_url = data.pictureUrl;
    data.manufacturer_id = data.manufacturerId;
    delete data.showSuccess;
    delete data.showForm;
    delete data.pictureUrl;
    delete data.manufacturerId;
    delete data.manufacturers;

    const modelUrl = `${process.env.REACT_APP_INVENTORY_API}/api/models/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
        picture_url: "",
        manufacturer_id: "",
        price: "",
        message: "Model has been added",
      };
      this.setState(cleared);
    } else {
      console.log(response);
    }
  }

  render() {
    return (
      <div className="row">
        <form
          onSubmit={this.handleSubmit}
          id="model-form"
          style={{ textAlign: "center" }}
        >
          <h3
            className="input-group d-inline-flex align-items-center w-auto"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              fontStyle: "italic",
              color: "blue",
              marginRight: "20px",
              marginTop: "50px",
            }}
          >
            Add Model
          </h3>
          <div className="input-group d-inline-flex align-items-center w-auto">
            <input
              onChange={this.handleNameChange}
              placeholder="Name"
              required
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={this.state.name}
              style={{ width: "300px", marginTop: "15px" }}
            />
          </div>
          <div className="input-group d-inline-flex align-items-center w-auto">
            <select
              required
              id="manufacturer"
              className="form-select"
              name="manufacturer"
              onChange={this.handleManufacturerIdChange}
              value={this.state.manufacturer_id}
              style={{ width: "300px" }}
            >
              <option value="">Choose manufacturer</option>
              {this.state.manufacturers.map((manufacturer) => {
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
              onChange={this.handlePriceChange}
              placeholder="Price"
              required
              type="text"
              name="price"
              id="price"
              className="form-control"
              value={this.state.price}
              style={{ width: "200px", marginTop: "15px" }}
            />
          </div>
          <div className="input-group d-inline-flex align-items-center w-auto">
            <input
              onChange={this.handlePictureUrlChange}
              placeholder="Picture URL"
              required
              type="url"
              name="picture url"
              id="picture url"
              className="form-control"
              value={this.state.picture_url}
              style={{ width: "400px" }}
            />
          </div>
          <button
            variant='contained'
            size='medium'
            style={{backgroundColor:'black', fontWeight:'bolder', color:'white', paddingTop:'4px', paddingBottom:'4px'}}
          >
            ADD
          </button>
        </form>
      </div>
    );
  }
}

export default ModelForm;
