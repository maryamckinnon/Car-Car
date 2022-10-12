import React from 'react';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobiles: [],
            salesPeople: [],
            customers: [],
            price: '',
        };
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        fetch('http://localhost:8100/api/automobiles/')
            .then(response => response.json())
            .then(response => this.setState({automobiles: response.autos}))
        fetch('http://localhost:8090/api/sales-people/')
            .then(response => response.json())
            .then(response => this.setState({salesPeople: response.sales_people}))
        fetch('http://localhost:8090/api/customers/')
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

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({price: value})
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.sales_price = data.salesPrice;
        data.sales_person = data.salesPerson;
        delete data.salesPerson;
        delete data.automobiles;
        delete data.salesPeople;
        delete data.customers;

        const salesRecordUrl = 'http://localhost:8090/api/sales-records/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(salesRecordUrl, fetchConfig);
        if (response.ok) {
            const autoUrl = `http://localhost:8100/api/automobiles/${this.state.automobile}/`
            const autoFetchConfig = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sold: true })
        }
        const autoResponse = await fetch(autoUrl, autoFetchConfig)
            if (!autoResponse.ok) {
                console.error(autoResponse);
            }
            const cleared = {
                price: '',
                automobile: '',
                salesPerson: '',
                customer: '',
            }
            this.setState(cleared);
        };
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
                        if (automobile.sold === false) {
                          return (
                              <option key={automobile.vin} value={automobile.id}> {automobile.vin} </option>
                          );
                          } else {
                            return null;
                          }
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
                      <option value="">Customer</option>
                      {this.state.customers.map(customer => {
                          return (
                              <option key={customer.id} value={customer.id}> {customer.name} </option>
                          );
                      })}
                      </select>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={this.handlePriceChange} placeholder="price" required 
                      type="number" name="price" id="price" className="form-control" value={this.state.price}/>
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



// import React from 'react';

// class SalesRecordForm extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             automobiles: [],
//             salesPeople: [],
//             customers: [],
//             price: '',
//         };
//         this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
//         this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
//         this.handleCustomerChange = this.handleCustomerChange.bind(this);
//         this.handlePriceChange = this.handlePriceChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     async componentDidMount() {
//         const automobileUrl = 'http://localhost:8100/api/automobiles/';
//         const salesPersonUrl = 'http://localhost:8090/api/sales-people/';
//         const customerUrl = 'http://localhost:8090/api/customers/';

//         const automobileResponse = await fetch(automobileUrl);
//         const salesPersonResponse = await fetch(salesPersonUrl);
//         const customerResponse = await fetch(customerUrl);

//         if (automobileResponse.ok && salesPersonResponse.ok && customerResponse.ok) {
//             const automobileData = await automobileResponse.json();
//             const salesPersonData = await salesPersonResponse.json();
//             const customerData = await customerResponse.json();

//             this.setState({
//                 customers: customerData.customers,
//                 automobiles: automobileData.autos,
//                 salespeople: salesPersonData.salespeople
//             });
//         }
//     }

//     handleAutomobileChange(event) {
//         const value = event.target.value;
//         this.setState({automobile: value})
//     }

//     handleSalesPersonChange(event) {
//         const value = event.target.value;
//         this.setState({salesPerson: value})
//     }

//     handleCustomerChange(event) {
//         const value = event.target.value;
//         this.setState({customer: value})
//     }

//     handlePriceChange(event) {
//         const value = event.target.value;
//         this.setState({price: value})
//     }
    
//     async handleSubmit(event) {
//         event.preventDefault();
//         const data = {...this.state};
//         data.sales_person = data.salesPerson;
//         delete data.salesPerson;
//         delete data.automobiles;
//         delete data.salesPeople;
//         delete data.customers;

//         const salesRecordUrl = 'http://localhost:8090/api/sales-records/'
//         const fetchConfig = {
//             method: "POST",
//             body: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         };

//         const response = await fetch(salesRecordUrl, fetchConfig);
//         if (response.ok) {
//             const autoUrl = `http://localhost:8100/api/automobiles/${this.state.automobile}/`
//             const autoFetchConfig = {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({sold: true}),
//             }
//             const autoResponse = await fetch(autoUrl, autoFetchConfig)
//             if (!autoResponse.ok) {
//                 console.error(autoResponse)
//             }

//             const cleared = {
//                 automobile: '',
//                 salesPerson: '',
//                 customer: '',
//                 price: '',
//             }
//             this.setState(cleared)
//         }
//     }


//     render() {
//         return (
//           <div className="row">
//             <div className="offset-3 col-6">
//               <div className="shadow p-4 mt-4">
//                 <h1>Create a new sales record</h1>
//                   <form onSubmit={this.handleSubmit} id="create-auto-form">
//                   <div className="mb-3">
//                       <select onChange={this.handleAutomobileChange} required id="automobile" 
//                       className="form-select" name="automobile" value={this.state.automobile}>
//                       <option value="">Automobile</option>
//                       {this.state.automobiles.map(automobile => {
//                         if (automobile.sold === false) {
//                             return (
//                               <option key={automobile.id} value={automobile.id}> {automobile.vin} </option>
//                           );
//                         } else {
//                             return null;
//                         }
//                       })}
//                       </select>
//                   </div>
//                   <div className="mb-3">
//                       <select onChange={this.handleSalesPersonChange} required id="sales_person" 
//                       className="form-select" name="sales_person" value={this.state.salesPerson}>
//                       <option value="">Sales Person</option>
//                       {this.state.salesPeople.map(salesperson => {
//                           return (
//                               <option key={salesperson.id} value={salesperson.id}> {salesperson.name} </option>
//                           );
//                       })}
//                       </select>
//                   </div>
//                   <div className="mb-3">
//                       <select onChange={this.handleCustomerChange} required id="customer" 
//                       className="form-select" name="customer" value={this.state.customer}>
//                       <option value="">Customer</option>
//                       {this.state.customers.map(customer => {
//                           return (
//                               <option key={customer.id} value={customer.id}> {customer.name} </option>
//                           );
//                       })}
//                       </select>
//                   </div>
//                   <div className="form-floating mb-3">
//                       <input onChange={this.handlePriceChange} placeholder="salesPrice" required 
//                       type="text" name="salesPrice" id="salesPrice" className="form-control" value={this.state.price}/>
//                       <label htmlFor="salesPrice">Sales Price</label>
//                   </div>
//                   <button className="btn btn-primary">Create</button>
//                 </form>
//           </div>
//           </div>
//       </div>
//         );
//     }
// }

// export default SalesRecordForm