import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: '',
      };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }

    handleNameChange(event) {
      const value = event.target.value;
      this.setState({name: value})
    }

    handleDelete(event) {
      const data = {...this.state};
    }

    async handleSubmit(event) {
      const data = {...this.state};

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
            showSuccess: '',
          };
          this.setState(cleared);
        } else {
          window.alert('Invalid request. Please try again.')
          const cleared = {
            name: '',
          };
          this.setState(cleared);
      }
    }
    
    render() {
      return (
          <div className='row'>
          <div className='offset-3 col-6'>
              <div className='manufacturer-form'>
              <form 
                onSubmit={this.handleSubmit} 
                id='create-manufacturer-form'
              >
                  <input 
                    onChange={this.handleNameChange} 
                    placeholder='Add manufacturer' 
                    required type='text'
                    name='name' 
                    id='name' 
                    value={this.state.name}
                  />
                  <button className='btn-add'>+</button>
                  <label htmlFor='name'></label>
              </form>
              </div>
            </div>
          </div>
      );
  }
}


export default ManufacturerForm;