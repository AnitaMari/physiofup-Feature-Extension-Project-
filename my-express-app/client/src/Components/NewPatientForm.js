import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
import './NewPatientForm.css';
import { link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EMPTY_FORM = {
    firstName: '',
    lastName: '',
    birthDate: '',
    email: ''
};
//function NewPatientForm({ patients, addPatient}) { //THIS WAS WRITTEN HERE
function NewPatientForm(props) { 
   // const [formData, setFormData] = useState(EMPTY_FORM); I CHANGED THIS FOR THE LINE BELOW
    //const [formData, setFormData] = useState(formData || EMPTY_FORM);
    
    const [newPatient, setNewPatient] = useState(props.formData || EMPTY_FORM);
    
    const navigate = useNavigate();

    function handleChange(event) {
        let { name, value } = event.target;
        setNewPatient(data => ({ //IT WAS WRITTEN setFormData
            ...data,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
       // addPatient(formData); //DO I NEED THIS?
       // console.log(formData); // DO I NEED THIS?
        //setFormData(EMPTY_FORM); // DO I NEED THIS?
        props.setEditingPat(null);//I ADDED THIS LINE
        props.addPatientCb(newPatient); //I ADDED THIS
       // navigate(`/patients/${patients[patients.length-1].id}`); //DO I NEED THIS?
        
    }

 
return (

  <div className="card">

    <form className="form-card mt-3" onSubmit={handleSubmit}>
                
        <div class="row justify-content-between text-left">
            <h5 className ="mb-2">Create a New Patient File</h5>
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="text" id="ans" name="firstName" placeholder="First Name"
                value={newPatient.firstName} //IT WAS WRITTEN formdata.firstName
                onChange={handleChange}/>     
            </div>
        </div>

        <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="text" id="ans" name="lastName" placeholder="Last Name"
                value={newPatient.lastName} //IT WAS WRITTEN formdata.firstName
                onChange={handleChange}/>     
            </div>
        </div>

        <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="date" id="ans" name="birthDate" placeholder="Birth Date YYYY-MM-DD"
                value={newPatient.birthDate} //IT WAS WRITTEN formdata.firstName
                onChange={handleChange}/>     
            </div>
        </div>

        <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="text" id="ans" name="email" placeholder="Email Address"
                value={newPatient.email} //IT WAS WRITTEN formdata.email
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