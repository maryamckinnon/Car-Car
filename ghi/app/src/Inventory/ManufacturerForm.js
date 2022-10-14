import React from "react";

class ManufacturerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  async handleSubmit(event) {
    const data = { ...this.state };

    const manufacturerUrl = `${process.env.REACT_APP_INVENTORY_API}/api/manufacturers/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
      };
      this.setState(cleared);
    } else {
      window.alert("Invalid request. Please try again.");
      const cleared = {
        name: "",
      };
      this.setState(cleared);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="manufacturer-form">
              <form
                className="form-inline"
                onSubmit={this.handleSubmit}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <input
                  onChange={this.handleNameChange}
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Add manufacturer"
                  aria-label="Add manufacturer"
                  style={{ width: "200px" }}
                />
                <button className="btn btn-success" type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManufacturerForm;
