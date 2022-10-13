import React from 'react';


class SalesRecordFiltered extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        salesPeople: [],
        salesRecords: [],
        salesPerson: '',
      };
      this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    }

    async handleSalesPersonChange(event) {
      const value = event.target.value;
      this.setState({ salesPerson: value });

      const salesRecordsUrl = 'http://localhost:8090/api/sales-records/';
      const salesRecordResponse = await fetch(salesRecordsUrl);

      if (salesRecordResponse.ok) {
        const salesRecordsData = await salesRecordResponse.json();

        if (this.state.salesPerson === "") {
          this.setState({ salesRecords: salesRecordsData.salesRecords });
        } else {
          let salesRecordsByEmployee = [];
          for (const salesRecord of salesRecordsData.salesRecords) {
            if (salesRecord.sales_person.name === this.state.salesPerson) {
                salesRecordsByEmployee.push(salesRecord);
            }
          }
          this.setState({ salesRecords: salesRecordsByEmployee });
        }
      }
    }

    async componentDidMount() {
        fetch('http://localhost:8090/api/sales-records/')
            .then(response => response.json())
            .then(response => this.setState({salesRecords: response.sales_records}))
        fetch('http://localhost:8090/api/sales-people/')
            .then(response => response.json())
            .then(response => this.setState({salesPeople: response.sales_people}))
    }


    render() {
      return (
        <div className="container">
            <p></p>
          <h2>Sales person history</h2>
          <div className="mb-3">
            <select onChange={this.handleSalesPersonChange} value={this.state.salesPerson} required name="salesPerson" id="salesPerson" className="form-select">
              <option value="">Choose Sales Person</option>
              {this.state.salesPeople.map(salesperson => {
                return (
                  <option key={salesperson.id} value={salesperson.id}>
                    {salesperson.name}
                  </option>
                )
              })}
            </select>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sales Person</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Sale Price</th>
              </tr>
            </thead>
            <tbody>
              {this.state.salesRecords.map(salesRecord => {
                return (
                  <tr key={salesRecord.id}>
                    <td>{salesRecord.sales_person.name}</td>
                    <td>{salesRecord.customer.name}</td>
                    <td>{salesRecord.automobile.vin}</td>
                    <td>$ {new Intl.NumberFormat().format(salesRecord.price)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

export default SalesRecordFiltered;
