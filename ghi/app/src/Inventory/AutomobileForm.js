// import React from 'react';

// class AutomobileForm extends React.Component {
//     initialState = {
//       vin: '',
//       color: '',
//       year: '',
//     }
//     constructor(props) {
//       super(props)
//       this.state = {
//         ...this.initialState,
//         models: [],
//       };
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     async componentDidMount() {
//       const url = `${process.env.REACT_APP_INVENTORY_API}/api/models/`;
    
//       const response = await fetch(url);

//       if (response.ok) {
//         const data = await response.json();
//         this.setState({models: data.models});
//       }
//     }

//     handleChange = (event) => {
//       const { name, value } = event.target;
//       this.setState({[name]: value})
//     }

//     async handleSubmit(event) {
//       event.preventDefault();
//       const data = {...this.state};
//       delete data.models

//       const autoUrl = `${process.env.REACT_APP_INVENTORY_API}/api/automobiles/`;
//       const fetchConfig = {
//           method: "post",
//           body: JSON.stringify(data),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//       };
        
//       const response = await fetch(autoUrl, fetchConfig);
//       if (response.ok) {
//           const newAuto = await response.json();
//           console.log(newAuto)

//           this.setState({...this.initialState});
//           this.props.load();
//       }
//     }
    
//     render() {
//         return (
//           <div className="row">
//             <div className="offset-3 col-6">
//               <div className="shadow p-4 mt-4">
//                 <h1>Add an automobile to inventory</h1>
//                   <form onSubmit={this.handleSubmit} id="create-auto-form">
//                   <div className="form-floating mb-3">
//                       <input onChange={this.handleChange} placeholder="Vin" 
//                       required type="text" name="vin" 
//                       id="vin" className="form-control" value={this.state.vin}/>
//                       <label htmlFor="vin">VIN</label>
//                   </div>
//                   <div className="form-floating mb-3">
//                       <input onChange={this.handleChange} placeholder="Color" 
//                       required type="text" name="color" 
//                       id="color" className="form-control" value={this.state.color}/>
//                       <label htmlFor="color">Color</label>
//                   </div>
//                   <div className="form-floating mb-3">
//                       <input onChange={this.handleChange} placeholder="Year" required 
//                       type="text" name="year" id="year" className="form-control" value={this.state.year}/>
//                       <label htmlFor="year">Year</label>
//                   </div>
//                   <div className="mb-3">
//                       <select onChange={this.handleChange} required id="model" 
//                       className="form-select" name="model_id" value={this.state.model}>
//                       <option value="">Model</option>
//                       {this.state.models.map(model => {
//                           return (
//                               <option key={model.id} value={model.id}> {model.name} </option>
//                           );
//                       })}
//                       </select>
//                   </div>
//                   <button className="btn btn-primary">Create</button>
//                 </form>
//           </div>
//           </div>
//       </div>
//         );
//     }
// }

// export default AutomobileForm;

import React from 'react';


class AutomobileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableModels: [],
            allModels: [],
            manufacturers: [],
            successVisible: "d-none",
            formVisible: "shadow p-4 mt-4",
            color: "",
            year: "2022",
            vin: "",
        };

        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.allModels;
        delete data.formVisible;
        delete data.manufacturer;
        delete data.manufacturers;
        delete data.successVisible;
        delete data.availableModels;

        const url = `${process.env.REACT_APP_INVENTORY_API}/api/automobiles/`;
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
                manufacturer: "",
                model_id: "",
                vin: "",
                year: "",
                successVisible: "",
                formVisible: "shadow p-4 mt-4 d-none",
                message: `${data.vin} successfully added to inventory`,
            }
            this.setState(cleared);
        } else {
            console.error("invalid request")
        }
    }

    handleReset(event) {
        this.setState({
            successVisible: "d-none",
            formVisible: "shadow p-4 mt-4",
        });
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

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer: value});
        const filteredModels = this.state.allModels.filter(model => {
            return model.manufacturer.id === parseInt(value);
        })
        this.setState({availableModels: filteredModels});
    }

    async componentDidMount() {
        const modelUrl = `${process.env.REACT_APP_INVENTORY_API}/api/models/`;
        const manufacturerUrl = `${process.env.REACT_APP_INVENTORY_API}/api/manufacturers/`;

        const modelResponse = await fetch(modelUrl);
        const manufacturerResponse = await fetch(manufacturerUrl);

        if (modelResponse.ok && manufacturerResponse.ok) {
            const models = await modelResponse.json();
            const manufacturers = await manufacturerResponse.json();
            this.setState({
                allModels: models.models,
                manufacturers: manufacturers.manufacturers,
            });
        } else {
            console.error("invalid request")
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className={this.state.successVisible}>
                        <div className="alert alert-success mt-4" role="alert">
                            {this.state.message}
                        </div>
                        <button className="btn btn-outline-success" onClick={this.handleReset}>
                            Add another
                        </button>
                    </div>
                    <div className={this.state.formVisible}>
                        <h1>Add an automobile to inventory</h1>
                        <form onSubmit={this.handleSubmit} id="newAutomobileForm">
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control" required type="text"
                                    onChange={this.handleColorChange} id="color"
                                    name="color" value={this.state.color}
                                    placeholder="color"
                                />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control" required type="number"
                                    max="2023" min="1905" onChange={this.handleYearChange}
                                    id="year" name="year" value={this.state.year}
                                />
                                <label htmlFor="year">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control" required type="text"
                                    maxLength={17} minLength={17} id="vin" name="vin"
                                    onChange={this.handleVinChange} placeholder="vin"
                                    value={this.state.vin}
                                />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select" required id="manufacturer"
                                    name="manufacturer" value={this.state.manufacturer}
                                    placeholder="manufacturer" onChange={this.handleManufacturerChange}
                                >
                                    <option value="">Choose one</option>
                                    {this.state.manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <label htmlFor="manufacturer">Manufacturer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select" required id="model_id"
                                    name="model_id" value={this.state.model_id}
                                    placeholder="model_id" onChange={this.handleModelChange}
                                >
                                    <option value="">Choose one</option>
                                    {this.state.availableModels
                                    .map(model => {
                                        return (
                                            <option key={model.id} value={model.id}>
                                                {model.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <label htmlFor="model_id">Model</label>
                            </div>
                            <button className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AutomobileForm;