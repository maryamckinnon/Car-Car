import React from 'react';

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            // manufacturers: [],
            color: '',
            year: '',
            vin: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        // this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    }

    async handleSubmit(event) {
        const data = {...this.state};
        delete data.models
        delete data.manufacturers

        const url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const cleared = {
                color: "",
                model_id: "",
                vin: "",
                year: "",
            }
            this.setState(cleared);
        } else {
            console.error("invalid request")
        }
    }


    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value.toUpperCase()});
    }

    handleYearChange(event) {
        const value = event.target.value;
        this.setState({year: value});
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value});
    }

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({model_id: value});
    }

    async componentDidMount() {
        const modelUrl = 'http://localhost:8100/api/models/';
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const modelResponse = await fetch(modelUrl);
        const manufacturerResponse = await fetch(manufacturerUrl);

        if (modelResponse.ok && manufacturerResponse.ok) {
            const models = await modelResponse.json();
            const manufacturers = await manufacturerResponse.json();
            this.setState({
                models: models.models,
                manufacturers: manufacturers.manufacturers,
            });
        } else {
            console.error("invalid request")
        }
    }

    render() {
        return (
          <div className="row">
          <div className="form-group col-xs-6">
            <form 
                onSubmit={this.handleSubmit} 
                id="add-auto-form"
                style={{paddingLeft:'130px', marginTop: '15px'}}
            >
                <h3 className="input-group d-inline-flex align-items-center w-auto"
                style={{fontSize:'16px', fontWeight:'bold', fontStyle:'italic', color:'blue', marginRight:'20px', marginTop:'50px'}}
                >Add Automobile</h3>
                <div className="input-group d-inline-flex align-items-center w-auto">
                    <input
                        className="form-control" 
                        required type="number"
                        max="2023" 
                        min="1900"
                        placeholder='Year'
                        onChange={this.handleYearChange}
                        id="year" 
                        name="year"
                        value={this.state.year}
                        style={{width:'180px'}}
                    />
                    <label htmlFor="year"></label>
                </div>
                
                <div className="input-group d-inline-flex align-items-center w-auto">
                    <select
                        className="form-select" 
                        required id="model"
                        name="model" 
                        value={this.state.model_id}
                        onChange={this.handleModelChange}
                        style={{width:'480px', textAlign:'center'}}
                    >
                        <option value="">Choose model</option>
                        {this.state.models
                        .map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="input-group d-inline-flex align-items-center w-auto">
                    <input
                        className="form-control input-group-lg" 
                        required type="text"
                        onChange={this.handleColorChange} 
                        id="color"
                        name="color" 
                        value={this.state.color}
                        placeholder="Color"
                        style={{width:'180px'}}
                    />
                    <label htmlFor="Color"></label>
                </div>

                <div className="input-group d-inline-flex align-items-center w-auto">
                    <input
                        className="form-control" 
                        required type="text"
                        minLength={17}
                        maxLength={17} 
                        id="vin" 
                        name="vin"
                        onChange={this.handleVinChange} 
                        placeholder="VIN"
                        value={this.state.vin}
                        style={{width:'280px'}}
                    />
                </div>

                <button className="btn btn-primary" style={{fontWeight:'bolder'}}>+</button>
            </form>
            </div>
            // </div>
        );
    }
}

export default AutomobileForm;
