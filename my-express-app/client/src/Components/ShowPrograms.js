import React, { useState } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import './ShowPrograms.css';
import AddProgramForm from './AddProgramForm';

function ShowPrograms(props) {
  const [editingProg, setEditingProg] = useState(null);

  function handleClick(progId) {
    setEditingProg(progId)
}
   
  return (
    <div className="ShowPrograms">
    
          <div className="card">
          <h4>Program Files </h4>
          {
                props.programs.map(p => (
                  
                    <div key={p.id}>
                    {/* I ADDED THESE 4 LINES TO TRY TO MODIFY THE PROGRAM */}
                    {editingProg === p.id ? ( 
                            <AddProgramForm submitProgramCb={(formData) => props.modifyProgramCb(p.id, formData)} formData={p} setEditingProg={setEditingProg} /> 
                        ) : ( 
                        <div className= "container">
                          
                            <button id="modifyButtonP" className="col-3" onClick={(e) => handleClick(p.id)} title="modify" type="button">MODIFY  TITLE</button> 
                        
                            <button id="deleteButtonP" className="btn btn-danger col-4" onClick={(e) => props.deleteProgramCb(p.id)} title="delete" type="button"> DELETE  PROGRAM </button>
                             {`          `}<Link className="container title text-info h5 text-decoration-none"
                            to={`/programs/program/${p.id}`}>{p.programTitle}
                            </Link>
                          </div>
                     
                        )
                  } </div>
                ))
                }
    </div>
    </div>

    
  );
}

export default ShowPrograms;