import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import './ExercisesList.css';
import UrlToShare from "./UrlToShare";
import AddExerciseForm from './AddExerciseForm'; //I ADDED THIS

function ExercisesList(props) {
  const [editingEx, setEditingEx] = useState(null);
  
function handleClick(exId) {
    setEditingEx(exId)
}
 
  return (
    <div className="container px-1 py-5 mx-auto">
     <h1 className="text-info pt-3">Program File </h1>
 
      {
                props.exercises.map(ex => (
                    <div className="row card bg-light" key={ex.id}>
                        {editingEx === ex.id ? ( 
                            <AddExerciseForm submitExerciseCb={(formData) => props.modifyExCb(ex.id, formData)} formData={ex} setEditingEx={setEditingEx} /> 
                        ) : ( 
                        <div> 
                            <h5>{ex.exerciseName}</h5>
                       
                            <h6>Video: <Link to={ex.video}>{ex.video}</Link></h6>
                            <h6>Series: {ex.series}</h6>
                            <h6>Repetitions: {ex.repetitions} </h6>
                            <h6>Notes: {ex.notes} </h6>
                        </div>
                      )} 
                         
                        <div id="divButton" className="col-6 content-right">
                        <button className="col-8" onClick={(e) => props.deleteEx(ex.id)} title="delete" type="button">DELETE</button>
                        </div>
                        
                        <div id="divButton" className="col-6 content-right">
                        <button className="col-8" onClick={(e) => handleClick(ex.id)} title="modify" type="button">MODIFY</button> 
                        </div>
                                  
                    </div>
                ))
            }
           
    </div>
  );
}

export default ExercisesList;