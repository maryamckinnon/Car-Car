import React from 'react';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobiles: [],
            salesPeople: [],
            customers: [],
            salesPrice: '',
        };
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSalesPriceChange = this.handleSalesPriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        fetch(`${process.env.REACT_APP_INVENTORY_API}/api/automobiles/`)
            .then(response => response.json())
            .then(response => this.setState({automobiles: response.autos}))
        fetch(`${process.env.REACT_APP_SALES_API}/api/sales-people/`)
            .then(response => response.json())
            .then(response => this.setState({salesPeople: response.sales_people}))
        fetch(`${process.env.REACT_APP_SALES_API}/api/customers/`)
            .then(response => response.json())
            .then(response => this.setState({customers: response.customers}))
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({automobile: value})
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({salesPerson: value})
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({customer: value})
    }

    handleSalesPriceChange(event) {
        const value = event.target.value;
        this.setState({salesPrice: value})
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.sales_price = data.salesPrice;
        data.sales_person = data.salesPerson;
        delete data.salesPerson;
        delete data.salesPrice;
        delete data.automobiles;
        delete data.salesPeople;
        delete data.customers;

        const salesRecordUrl = 'http://localhost:8090/api/sales-records/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(salesRecordUrl, fetchConfig);
        if (response.ok) {
            const newSalesRecord = await response.json();

            const cleared = {
                automobile: '',
                salesPerson: '',
                customer: '',
                salesPrice: '',
            }
            this.setState(cleared)
        }
    }


    render() {
        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new sales record</h1>
                  <form onSubmit={this.handleSubmit} id="create-auto-form">
                  <div className="mb-3">
                      <select onChange={this.handleAutomobileChange} required id="automobile" 
                      className="form-select" name="automobile" value={this.state.automobile}>
                      <option value="">Automobile</option>
                      {this.state.automobiles.map(automobile => {
                          return (
                              <option key={automobile.id} value={automobile.id}> {automobile.vin} </option>
                          );
                      })}
                      </select>
                  </div>
                  <div className="mb-3">
                      <select onChange={this.handleSalesPersonChange} required id="sales_person" 
                      className="form-select" name="sales_person" value={this.state.salesPerson}>
                      <option value="">Sales Person</option>
                      {this.state.salesPeople.map(salesPerson => {
                          return (
                              <option key={salesPerson.id} value={salesPerson.id}> {salesPerson.name} </option>
                          );
                      })}
                      </select>
                  </div>
                  <div className="mb-3">
                      <select onChange={this.handleCustomerChange} required id="customer" 
                      className="form-select" name="customer" value={this.state.customer}>
                      <option value="">Cutomer</option>
                      {this.state.customers.map(customer => {
                          return (
                              <option key={customer.id} value={customer.id}> {customer.name} </option>
                          );
                      })}
                      </select>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={this.handleSalesPriceChange} placeholder="salesPrice" required 
                      type="text" name="salesPrice" id="salesPrice" className="form-control" value={this.state.salesPrice}/>
                      <label htmlFor="salesPrice">Sales Price</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
          </div>
          </div>
      </div>
        );
    }
}

export default SalesRecordForm