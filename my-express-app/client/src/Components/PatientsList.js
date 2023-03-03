import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import './PatientsList.css';
import UrlToShare from "./UrlToShare";
import NewPatientForm from './NewPatientForm'; 

function PatientsList(props) { 
    const [editingPat, setEditingPat] = useState(null);
    
  function handleClick(pId) {
      setEditingPat(pId)
  }
   
    return (
      <div>
      <h1>Patient's File </h1>
      <div className="card text-info">
        
    {
        props.patients.map(p => (
       <div className="row card bg-light" key={p.id}>
              {editingPat === p.id ? ( 
             <NewPatientForm addPatientCb={props.addPatientCb} formData={patient} setEditingPat={setEditingPat} /> 
              ) : ( 
            
            <div>   
             <h5 className="text-info">First Name: {patient?.firstName}</h5>
             <h5 className="text-info">Last Name: {patient?.lastName}</h5>
             <h5 className="text-info">Birth Date: {patient?.birthDate}</h5>
             <h5 className="text-info mb-5">Email Address: {patient?.email}</h5>
          </div>
  
              )}
  
  
          <div id="divButton" className="col-6 content-right">
              <button className="col-8" onClick={(p) => props.deletePatient(p.id)} title="delete" type="button">DELETE</button>
          </div>
                          
          <div id="divButton" className="col-6 content-right">
                <button className="col-8" onClick={(p) => handleClick(p.id)} title="modify" type="button">MODIFY</button> 
          </div>
              
       </div>
          ))
        }
    </div>
      </div>    
    );
  }
  

export default PatientsList;