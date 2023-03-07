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
                        <div>
                          <div id="divButton" className="col-6 content-right">
                          <button className="col-8" onClick={(e) => handleClick(p.id)} title="modify" type="button">MODIFY</button> 
                        </div>

                          <div>
                            <button id="deleteButton" className="btn btn-danger" onClick={(e) => props.deleteProgramCb(p.id)} title="delete" type="button"> DELETE </button>
                             {`          `}<Link className="text-info h5 text-decoration-none"
                            to={`/programs/program/${p.id}`}>{p.programTitle}
                            </Link>
                          </div>
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