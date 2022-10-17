import React from "react";

class SalesRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      automobiles: [],
      salesPeople: [],
      customers: [],
      price: "",
    };
    this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    fetch(`${process.env.REACT_APP_SALES_API}/api/automobileVO/`)
      .then(res => res.json())
      .then(automobileData => this.setState({ automobiles: automobileData.automobiles}));
    fetch(`${process.env.REACT_APP_SALES_API}/api/sales-people/`)
      .then(res => res.json())
      .then(salesPeopleData => this.setState({ salesPeople: salesPeopleData.sales_people }));
    fetch(`${process.env.REACT_APP_SALES_API}/api/customers/`)
      .then(res => res.json())
      .then(customerData => this.setState({ customers: customerData.customers }));
  }

  handleAutomobileChange(event) {
    const value = event.target.value;
    this.setState({ automobile: value });
  }

  handleSalesPersonChange(event) {
    const value = event.target.value;
    this.setState({ salesPerson: value });
  }

  handleCustomerChange(event) {
    const value = event.target.value;
    this.setState({ customer: value });
  }

  handlePriceChange(event) {
    const value = event.target.value;
    this.setState({ price: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.sales_person = data.salesPerson;
    delete data.salesPerson;
    delete data.automobiles;
    delete data.salesPeople;
    delete data.customers;

    const salesRecordUrl = `${process.env.REACT_APP_SALES_API}/api/sales-records/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salesRecordUrl, fetchConfig);
    if (response.ok) {
      const autoUrl = `${process.env.REACT_APP_INVENTORY_API}/api/automobiles/${this.state.automobile}/`;
        const autoFetchConfig = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sold: true }),
        };
        const autoResponse = await fetch(autoUrl, autoFetchConfig);
        if (!autoResponse.ok) {
          console.error(autoResponse);
        }
      const cleared = {
        price: "",
        automobile: "",
        salesPerson: "",
        customer: "",
      };
      this.setState(cleared);
      window.alert("Your sales record has been saved successfully!")
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new sales record</h1>
            <form onSubmit={this.handleSubmit} id="create-auto-form">
              <div className="mb-3">
                <select
                  onChange={this.handleAutomobileChange}
                  required
                  id="automobile"
                  className="form-select"
                  name="automobile"
                  value={this.state.automobile}
                >
                  <option value="">Automobile</option>
                  {this.state.automobiles.map((automobile) => {
                    if (automobile.sold === false) {
                      return (
                        <option key={automobile.id} value={automobile.vin}>
                          {automobile.vin}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleSalesPersonChange}
                  required
                  id="sales_person"
                  className="form-select"
                  name="sales_person"
                  value={this.state.salesPerson}
                >
                  <option value="">Sales Person</option>
                  {this.state.salesPeople.map((salesPerson) => {
                    return (
                      <option key={salesPerson.id} value={salesPerson.name}>
                        {salesPerson.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleCustomerChange}
                  required
                  id="customer"
                  className="form-select"
                  name="customer"
                  value={this.state.customer}
                >
                  <option value="">Customer</option>
                  {this.state.customers.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handlePriceChange}
                  placeholder="price"
                  required
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                  value={this.state.price}
                />
                <label htmlFor="price">Sales Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesRecordForm;
