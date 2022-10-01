import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: '',
        showForm: 'shadow p-4 mt-4',
        showSuccess: 'd-none',
      };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    handleNameChange(event) {
      const value = event.target.value;
      this.setState({name: value})
    }

    handleReset(event) {
      this.setState(
          {showForm: 'shadow p-4 mt-4',
          showSuccess: 'd-none'}
      );
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      delete data.showForm;
      delete data.showSuccess;

      const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
          const cleared = {
            name: '',
            showForm: 'shadow p-4 mt-4 d-none',
            showSuccess: '',
          };
          this.setState(cleared);
        } else {
          console.error('invalid request')
      }
    }
    
    render() {
      return (
          <div className='row'>
          <div className='offset-3 col-6'>
          <div className={this.state.showSuccess}>
                        <div className="alert alert-success mt-4" role="alert">
                            Manufacturer has been added
                        </div>
                        <button className="btn btn-outline-success" onClick={this.handleReset}>
                            Add another manufacturer
                        </button>
                    </div>
            {/* <div className={this.state.showForm}> */}
              <form onSubmit={this.handleSubmit} id='create-manufacturer-form'>
                  <input onChange={this.handleNameChange} placeholder='Add manufacturer' required type='text'
                  name='name' id='name' value={this.state.name}/>
                  <label htmlFor='name'><button className='btn btn-primary'>Add</button></label>
              </form>
            </div>
          </div>
        // </div>
      );
  }
}


export default ManufacturerForm;