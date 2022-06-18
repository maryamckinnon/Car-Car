import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeNumber: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({employeeNumber: value})
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        const data.employee_number = data.employeeNumber;
        delete data.locations;
        console.log("data", data);

        const technicianUrl = "http://localhost:8080/api/services";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        
//         const response = await fetch(hatUrl, fetchConfig);
//         if (response.ok) {
//             const newHat = await response.json();
//             console.log(newHat);

//             const cleared = {
//                 fabric: '',
//                 style: '',
//                 color: '',
//                 picture: '',
//                 location: '',
//             }
//             this.setState(cleared)
//         }
//     }

//     async componentDidMount() {
//         const url = "http://localhost:8100/api/locations/";
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             this.setState({ locations: data.locations });
//         }
//     }

//     render() {
//         return (
//             <div className="row">
//                 <div className="offset-3 col-6">
//                 <div className="shadow p-4 mt-4">
//                     <h1>Create a new hat</h1>
//                     <form onSubmit={this.handleSubmit} id="create-hat-form">
//                     <div className="form-floating mb-3">
//                         <input onChange={this.handleFabricChange} placeholder="Fabric" 
//                         required type="text" name="name" 
//                         id="fabric" className="form-control" value={this.state.fabric}/>
//                         <label htmlFor="fabric">fabric</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input onChange={this.handleStyleChange} placeholder="Style" 
//                         required type="text" name="style" 
//                         id="style" className="form-control" value={this.state.style}/>
//                         <label htmlFor="style">Style</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input onChange={this.handleColorChange} placeholder="Color" required 
//                         type="text" name="color" id="color" className="form-control" value={this.state.color}/>
//                         <label htmlFor="color">Color</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <label htmlFor="picture" className="form-label">Picture</label>
//                         <input className="form-control" name="description" id="description" type="text"
//                         onChange={this.handlePictureChange} value={this.state.picture}>
//                         </input>
//                     </div>
//                     <div className="mb-3">
//                         <select onChange={this.handleLocationChange} required id="location" 
//                         className="form-select" name="location" value={this.state.location}>
//                         <option value="">Location</option>
//                         {this.state.locations.map(location => {
//                             return (
//                                 <option key={location.id} value={location.href}> {location.closet_name} </option>
//                             );
//                         })}
//                         </select>
//                     </div>
//                     <button className="btn btn-primary">Create</button>
//                     </form>
//                 </div>
//                 </div>
//             </div>
//         );
//     }

// }

// export default HatForm;
