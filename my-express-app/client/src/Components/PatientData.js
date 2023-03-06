import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import './PatientData.css';
import NewPatientForm from "./NewPatientForm";

function PatientData({patients, modifyPatient, deletePatient}) { 
    const { patientId } = useParams();
    console.log(patientId);
    const patient = patients.find((patient) => +patient.id === +patientId);
    console.log(patient);
    if (patient) {
      patient.birthDate = patient?.birthDate.replace(/T.*/,"");//to remove the time at the end
    }
    const [editingPat, setEditingPat] = useState(false);
    
    function handleClick() {
      setEditingPat(true)
  }

  return (
    <div>
    <h1>Patient's File </h1>
    <div className="card text-info">
      {editingPat === true ? ( 
        <NewPatientForm submitPatientCb={(newFormData) => modifyPatient(patientId, newFormData)} formData={patient} setEditingPat={setEditingPat} /> 
          ) : (    
          <div>   
           <h5 className="text-info">First Name: {patient?.firstName}</h5>
           <h5 className="text-info">Last Name: {patient?.lastName}</h5>
           <h5 className="text-info">Birth Date: {patient?.birthDate}</h5>
           <h5 className="text-info mb-5">Email Address: {patient?.email}</h5>
        </div>
          )}
     </div>
     
    <div className= "container">
     <div id="divButton1" className="col-6 content-right">
    <button className="col-8" onClick={(handleClick)} title="modify" type="button">MODIFY</button> 
    
    </div>

     <div id="divButton2" className="col-6 content-right">
      <button className="btn btn-danger col-8" onClick={(e) => deletePatient(patientId)} title="delete" type="button">DELETE</button>
     </div>
     </div>
    </div>
    
  );
}

export default PatientData;