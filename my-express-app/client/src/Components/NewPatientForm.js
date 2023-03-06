import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
import './NewPatientForm.css';
import { link } from 'react-router-dom';

const EMPTY_FORM = {
    firstName: '',
    lastName: '',
    birthDate: '',
    email: ''
};

function NewPatientForm(props) { 
    const [newPatient, setNewPatient] = useState(props.formData || EMPTY_FORM);
    
    function handleChange(event) {
        let { name, value } = event.target;
        setNewPatient(data => ({ 
            ...data,
            [name]: value
        }));
    }

    function handleSubmit(event) {
       event.preventDefault();
       props.submitPatientCb(newPatient); 
       setNewPatient(EMPTY_FORM);
       props.setEditingPat(null);
    }

 
return (

  <div className="card">

    <form className="form-card mt-3" onSubmit={handleSubmit}>
                
        <div class="row justify-content-between text-left">
            <h5 className ="mb-2">Create a New Patient File</h5>
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="text" id="ans" name="firstName" placeholder="First Name"
                value={newPatient.firstName} 
                onChange={handleChange}/>     
            </div>
        </div>

        <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="text" id="ans" name="lastName" placeholder="Last Name"
                value={newPatient.lastName} 
                onChange={handleChange}/>     
            </div>
        </div>

        <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="date" id="ans" name="birthDate" placeholder="Birth Date YYYY-MM-DD"
                value={newPatient.birthDate} 
                onChange={handleChange}/>     
            </div>
        </div>

        <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="text" id="ans" name="email" placeholder="Email Address"
                value={newPatient.email} 
                onChange={handleChange}/>     
            </div>
        </div>

        <div className="row justify-content-center text-center mb-4">
            <div className="form-group " id="formbutton"> 
            <button type="submit" id="buttonForm" className="btn-block btn-primary col-sm-6">ADD PATIENT</button> 
            </div>
        </div>
    </form>
    </div>
  

    );

} 

export default NewPatientForm;