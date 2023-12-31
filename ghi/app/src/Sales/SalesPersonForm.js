import React from "react";

class SalesPersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employeeNumber: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmployeeNumberChange =
      this.handleEmployeeNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleEmployeeNumberChange(event) {
    const value = event.target.value;
    this.setState({ employeeNumber: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.employee_number = data.employeeNumber;
    delete data.employeeNumber;

    const salesPersonUrl = `${process.env.REACT_APP_SALES_API}/api/sales-people/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(salesPersonUrl, fetchConfig);
    if (response.ok) {
      await response.json();

      const cleared = {
        name: "",
        employeeNumber: "",
      };
      this.setState(cleared);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add sales person</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleNameChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={this.state.name}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleEmployeeNumberChange}
                  placeholder="employeeNumber"
                  required
                  type="text"
                  name="employeeNumber"
                  id="employeeNumber"
                  className="form-control"
                  value={this.state.employeeNumber}
                />
                <label htmlFor="employeeNumber">Employee Number</label>
              </div>
              <button
                variant="contained"
                size="medium"
                style={{
                  backgroundColor: "black",
                  fontWeight: "bolder",
                  color: "white",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesPersonForm;
