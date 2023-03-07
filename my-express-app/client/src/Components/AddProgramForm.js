import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import './AddProgramForm.css';

const EMPTY_PROGRAM = {
  programTitle: '',
  creationDate: ''
};

function AddProgramForm(props) {

  if (props.formData) {
    props.formData.creationDate = props.formData.creationDate.replace(/T.*/,"");//to remove the time at the end
  }

  const [newProgram, setNewProgram] = useState(props.formData || EMPTY_PROGRAM);  
  
  function handleSubmit(event) {
    event.preventDefault();
    props.submitProgramCb(newProgram);
    console.log(newProgram);
    props.setEditingProg(null);
    // setNewProgram(EMPTY_PROGRAM);
  }

  function handleChange(event) {
    let { name, value } = event.target;
        setNewProgram(data => ({
            ...data, 
            [name]: value
        }));
    }

  
return (
  <div className="card">
    
    <form onSubmit={handleSubmit} className="form-card mt-3">
                
         <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <h5 className="mb-2">Add a New Program</h5>
                <label className="form-control-label px-1"></label>
                <input type="text" id="ans" name="programTitle" placeholder="Program Title"
                value={newProgram.programTitle}
                onChange={handleChange}
            />  
          </div>
          </div>
          <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="date" id="ans" name="creationDate" placeholder="Toda's Date"
                value={newProgram.creationDate}
                onChange={handleChange}
            />  
          </div>
          </div>

        <div className="row justify-content-center text-center mb-4">
            <div> 
            <button type="submit">ADD PROGRAM</button> 
            </div>
        </div>
    </form>
    </div>
);

} 

  export default AddProgramForm;