import React, { useState } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import './ShowPrograms.css';

function ShowPrograms(props) {
   
  return (
    <div className="ShowPrograms">
    
          <div className="card">
          <h4>Program Files </h4>
          {
                props.programs.map(p => (
                    <div key={p.id}>
                        <div>
                        <button id="deleteButton" className="btn btn-danger" onClick={(e) => props.deleteProgramCb(p.id)} title="delete" type="button"> DELETE </button>
                        {`          `}<Link className="text-info h5 text-decoration-none"
                        to={`/programs/program/${p.id}`}>{p.programTitle}
                        </Link>
                        
                        </div>
                    </div>
                ))
                }
    </div>
    </div>

    
  );
}

export default ShowPrograms;