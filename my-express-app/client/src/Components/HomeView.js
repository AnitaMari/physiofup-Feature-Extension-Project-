import React, { useState } from "react";
import './HomeView.css';
import { Link } from 'react-router-dom';
import NewPatientForm from "./NewPatientForm";
import SearchPatient from "./SearchPatient";
import Header from "./Header";

function HomeView({patients, setPatients}) {

    //POST a new patient
    async function addPatient(patient) {
    // Define fetch() options
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient)
        
    };
    console.log(patient);
    try {
        let response = await fetch('/patients/', options);
        if (response.ok) {
            let patients = await response.json();
            setPatients(patients);

        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
    
}

//I ADDED THESE TWO FUNCTIONS TO MODIFY AND DELETE A PATIENT

// PUT: Modify patient inputs //PENDING TO SEE HOW I DO IT WITH EXERCISES. WAITING FOR VICKY
async function modifyPatient(id) {
    let formData = patients.find(p => p.id === id);

    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient)
    };

    try {
        let response = await fetch(`/patients/pat/${id}`, options);
        if (response.ok) {
            let patients = await response.json();
            setPatients(patients);
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
}

// DELETE an exercise
async function deletePatient(id) {
  // Define fetch() options
  let options = {
      method: 'DELETE'
  };

  try {
      let response = await fetch(`/patients/${id}`, options);
      if (response.ok) {
          let patients = await response.json();
          setPatients(patients);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
}


    return (
        <div className="container-fluid px-1 py-5 mx-auto" id="headerCard">
    <div className="row d-flex justify-content-center">
    <div className="col-xl-6 col-lg-8 col-md-9 col-11">
    <div className="row justify-content-center text-left pt-3"></div>
        <div className="HomeView">
            <Header />
            <SearchPatient />
            <NewPatientForm patients={patients} addPatient={addPatient}/>
        </div>
        </div>
    </div>
    </div>
            
    );
}

export default HomeView;