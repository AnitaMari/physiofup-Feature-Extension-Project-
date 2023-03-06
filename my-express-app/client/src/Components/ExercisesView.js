import { useEffect } from "react";
import React, { useState } from "react";
import './ExercisesView.css';
import { useParams, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import AddExerciseForm from "./AddExerciseForm";
import ExercisesList from "./ExercisesList";
import ShareForm from "./ShareForm";
// import UrlToShare from "./UrlToShare";

function ExercisesView(props) {

    const [exercises, setExercises] = useState([]);
    const { programId } = useParams();
  
    useEffect(() => {
      getExercises();
    }, []);
  
  // Get All exercises from a program
  async function getExercises() {
  
    try {
      let response = await fetch(`/exercises/${programId}`);
      if (response.ok) {
          let exercises = await response.json();
          setExercises(exercises);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
  }
  
  //POST a new exercise to the program
  async function addExercise (exercise) {
    console.log(exercise);
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise)
    };
    try {
      let response = await fetch(`/exercises/${programId}`, options);
      if (response.ok) {
        let exercises = await response.json();
        setExercises(exercises);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }
 

// DELETE an exercise
async function deleteEx( id) {
  let confirm = window.confirm("Are you sure you want to delete this exercise?")
    
  if (confirm) {
  // Define fetch() options
  let options = {
      method: 'DELETE'
  };

  try {
      let response = await fetch(`/exercises/${programId}/${id}`, options);
      if (response.ok) {
          let exercises = await response.json();
          setExercises(exercises);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
}
}

// PUT: Modify exercise inputs
async function modifyEx(id, formData) {
 
  let options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
  };
console.log(formData);
console.log(id);
  try {
      let response = await fetch(`/exercises/ex/${id}`, options);
      if (response.ok) {
          let exercises = await response.json();
          setExercises(exercises);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
}

 return (
      <div class="bg-white">
      <div class="container-fluid mx-auto col-xl-9 col-lg-7 col-md-6 col-12">
      <div class="row d-flex justify-content-center">

        <div className="bg-white">          
          <ExercisesList exercises={exercises} deleteEx={deleteEx} modifyExCb={modifyEx}/>
        </div>
      </div>
      </div>
          <AddExerciseForm submitExerciseCb={addExercise} />
          <ShareForm exercises={exercises}/>
          
      </div>
    );
}


export default ExercisesView;