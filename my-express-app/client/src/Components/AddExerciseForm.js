import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import './AddExerciseForm.css';

const EMPTY_EXERCISE = {
  exerciseName: '',
  video: '',
  series: 0,
  repetitions: 0,
  notes: ''
};

function AddExerciseForm(props) { 
  const [newExercise, setNewExercise] = useState(props.formData || EMPTY_EXERCISE);  
 
  function handleSubmit(event) {
    event.preventDefault();
    props.submitExerciseCb(newExercise);
    console.log(newExercise);
    props.setEditingEx(null);
  }

  function handleChange(event) {
    let { name, value } = event.target;
        setNewExercise(data => ({
            ...data, 
            [name]: value
        }));
    }
  
  
return (
    
    <div class="container-fluid mx-auto">
    <div class="row d-flex justify-content-center">
    {/* <div class="col-xl-7 col-lg-8 col-md-9 col-11"> */}

  <div className="card bg-info">

    <form className="form-card" onSubmit={handleSubmit}>
        <div className="row justify-content-between text-left">
            <h4>Add a New Exercise</h4>
            <div className="form-group col-sm-6 flex-column d-flex"> 
                  <label className="form-control-label px-1">Name the exercise<span className="text-danger"> *</span></label>
                  <input type="text" id="fname" name="exerciseName"
                  value={newExercise.exerciseName}
                  onChange={handleChange}/> 
            </div>

            <div className="form-group col-sm-6 flex-column d-flex"> 
            <label className="form-control-label px-1">Video Url</label>
            <input type="url" id="lname" name="video"
             value={newExercise.video}
             onChange={handleChange}/>
            </div>
        </div>

        <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex"> 
            <label className="form-control-label px-1">Series<span className="text-danger"> *</span></label>
            <input type="number" id="email" name="series"
            value={newExercise.series}
            onChange={handleChange}/>
            </div>
            
            <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-1">Repetitions<span className="text-danger"> *</span></label>
                <input type="number" id="mob" name="repetitions"
                value={newExercise.repetitions}
                onChange={handleChange}/>
            </div>
        </div>
        
        <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1">Notes</label>
                <textarea type="text" id="ans" name="notes" 
                placeholder="Add more instructions here..."
                value={newExercise.notes}
                onChange={handleChange}/>     
            </div>
        </div>
        <div className="row justify-content-center text-center mb-4">
            <div className="form-group"> 
            <button type="submit" id="formbuttonex" className="btn-block col-sm-6">ADD EXERCISE</button> 
            </div>
        </div>
    </form>
    </div>
    </div>
    </div>
    //  </div>
);

} 

  export default AddExerciseForm;