import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import PatientFile from "./Components/PatientFile";
import HomeView from "./Components/HomeView";
import ExercisesView from "./Components/ExercisesView";
import UrlToShare from "./Components/UrlToShare";
import { useNavigate } from "react-router-dom";

function App() {
  
  const [patients, setPatients] = useState([]);
  //when the page loads, fetch the data from the server

  const navigate = useNavigate(); //to go to the search page if I delete a patient

  useEffect(() => {
    getPatients();
  }, []);

// Get All patients
async function getPatients() {
  try {
    let response = await fetch('/patients');
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

//Delete a patient
async function deletePatient(id) {
  // Define fetch() options
  let confirm = window.confirm("Are you sure you want to delete this patient? This patient's programs and exercises will be deleted too.")
  console.log(confirm);
  
  if (confirm) {
    navigate("/");

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
  }

// PUT: Modify patient inputs 
async function modifyPatient(id, formData) {

  let options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
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
    <div className="bg-info">
      
      <Routes className="center">
        <Route path="/" element= {<HomeView patients={patients}/>}  />
        <Route path="/patients/:patientId" element={<PatientFile modifyPatient={modifyPatient} deletePatient={deletePatient} patients={patients}/>} />
        <Route path="/programs/program/:programId" element={<ExercisesView />} />
        <Route path="/exercises/:programId" element={<UrlToShare />} />
      </Routes>

    </div> 
  );
}

export default App;