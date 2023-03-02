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
 
  //MY NEW CODE TO BE ABLE TO MODIFY THE EXERCISES. SO FAR YOU CAN ONLY DELETE THEM OR ADD A NEW ONE.
  //I COPIED THIS FROM MY WEEKLY RESOLUTIONS PROJECT TO GUIDE ME:
//   const updateResolution = async id => {
//     let resolution = resolutions.find(r => r.id === id);
//     resolution.complete = !resolution.complete;

//     let options = {
//         method: "PUT",
//         headers: { "Content-Type": "application/json"},
//         body: JSON.stringify(resolution)
//     };

//     try { 
//         let response = await fetch(`/days/${id}/resolutions/${id}`, options);
//         if (response.ok) {
//             let data = await response.json();
//             setResolutions(data);
//         } else {
//             console.log(`Server error: ${response.status}:
//             ${response.statusText}`);
//         }
//     } catch (err) {
//         console.log(`Network error: ${err.message}`);
//     }
// };


  
//NATALIA'S TRY TO MODIFY THE EXERCISES:
  // PUT: Modify exercise inputs
  async function modifyEx(id) {
    let exercise = exercises.find(e => e.id === id);

    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise)
    };

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

// DELETE an exercise
async function deleteEx( id) {
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

    return (
      <div class="bg-white">
      <div class="container-fluid mx-auto col-xl-9 col-lg-7 col-md-6 col-12">
      <div class="row d-flex justify-content-center">

        <div className="bg-white">          
          <ExercisesList exercises={exercises} deleteEx={deleteEx} />
        </div>
      </div>
      </div>
          <AddExerciseForm addExerciseCb={addExercise} />
          <ShareForm exercises={exercises}/>
          
      </div>
    );
}

//THIS IS WHAT I HAD IN MY PROJECT
// return (
    
//   <div className="DayView">
//     <h3>YOUR {day?.name}'S RESOLUTIONS</h3>
//    <div className="ResolutionList">
//       <ResolutionList
//       resolutions={resolutions}
//       toggleDoneCb={id => updateResolution(id)}
//       deleteCb={id => deleteResolution(id)}
//       />
//   <h3>Add a New Resolution</h3>
//   <ResolutionForm addResolutionCb={text => addResolution(text)} />
//   </div>
//   </div> 
// );



export default ExercisesView;