import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import './PatientData.css';
import NewPatientForm from "./NewPatientForm";
import HomeView from "./HomeView";

function PatientData({patients}) { 
    const { patientId } = useParams();
    const patient = patients.find((patient) => +patient.id === +patientId);
    const [editingPat, setEditingPat] = useState(false);

    function handleClick() {
      setEditingPat(true)
  }

  return (
    <div>
    <h1>Patient's File </h1>
    <div className="card text-info">
             
          <div>   
           <h5 className="text-info">First Name: {patient?.firstName}</h5>
           <h5 className="text-info">Last Name: {patient?.lastName}</h5>
           <h5 className="text-info">Birth Date: {patient?.birthDate}</h5>
           <h5 className="text-info mb-5">Email Address: {patient?.email}</h5>
        </div>

     </div>
  
  </div>
    
  );
}

export default PatientData;