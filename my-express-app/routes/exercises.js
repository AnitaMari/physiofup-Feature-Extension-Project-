var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// GET exercises by programId
router.get("/:programId", async function(req, res, next) {
 let programId = req.params.programId
//  let programId = req.params.programId;

  try {
    let results = await db(`SELECT * FROM exercises WHERE programId = ${programId}`);
    let programs = results.data;
    // if (programs.length === 0) {
    
    //   res.status(404).send({ error: "Programs not found" });
    // } else {
    //   res.send(programs);
    // }
    res.send(programs);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET exercise by id
router.get("/ex/:id", async function(req, res, next) {
  let index = req.params.id
 //  let programId = req.params.programId;
 
   try {
     let results = await db(`SELECT * FROM exercises WHERE id = ${index}`);
     let exercises = results.data;
     // if (programs.length === 0) {
     
     //   res.status(404).send({ error: "Programs not found" });
     // } else {
     //   res.send(programs);
     // }
     res.send(exercises);
   } catch (err) {
     res.status(500).send({ error: err.message });
   }
 });

// // GET each program
// router.get("/:patientId/:programId", async function(req, res, next) {
//   let patientId = req.params.patientId
//   let programId = req.params.programId;
 
//    try {
//      let results = await db(`SELECT * 
//      FROM programs
//      WHERE patientId = ${patientId} AND id = ${programId}
//     `);

//      let programs = results.data;
     // if (programs.length === 0) {
     
     //   res.status(404).send({ error: "Programs not found" });
     // } else {
     //   res.send(programs);
     // }
//      res.send(programs);
//    } catch (err) {
//      res.status(500).send({ error: err.message });
//    }
//  });
 
// // GET all programs 
// router.get("/", async function(req, res, next) {
 
//   try {
//     let results = await db('SELECT * FROM programs');
//     let programs = results.data;
//   //   if (exercises.length === 0) {
//   //     //students array is empty so no students found
//   //     res.status(404).send({ error: "Exercises not found" });
//   //   } else {
//   //     res.send(exercises);
//   //   }
//     res.send(programs);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// // GET data of a program (all its exercises)
// router.get("/:programId", async function(req, res, next) {
//     let index = req.params.programId;
  
//     try {
//       let results = await db(`SELECT * FROM exercises
//       WHERE programId = ${index}
//      `);
  
//       let exercises = results.data;
//     //   if (exercises.length === 0) {
//     //     //students array is empty so no students found
//     //     res.status(404).send({ error: "Exercises not found" });
//     //   } else {
//     //     res.send(exercises);
//     //   }
//       res.send(exercises);
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   });

  //post a new exercise
    router.post("/:programId", async (req, res, next) => {
    let { exerciseName, video, series, repetitions, notes } = req.body;
    let programId = req.params.programId;
    let sql = `
        INSERT INTO exercises (exerciseName, video, series, repetitions, notes, programId)
        VALUES ('${exerciseName}','${video}', ${series}, ${repetitions}, '${notes}', ${programId})
    `;
  
    try {
        await db(sql);
        let result = await db(`SELECT * FROM exercises WHERE programId = ${programId}`);
        let exercises = result.data;
        res.status(201).send(exercises);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });
  
  //delete an exercise
  router.delete("/:programId/:id", async (req, res, next) => {
    let index = req.params.id;
    let programId = req.params.programId;
  
    try {
        let result = await db(`SELECT * FROM exercises WHERE id = ${index}`);
        if (result.data.length === 0) {
            res.status(404).send({ error: 'Exercise not found' });
        } else {
            await db(`DELETE FROM exercises WHERE id = ${index}`);
            let result = await db(`SELECT * FROM exercises WHERE programId = ${programId}`);
            let exercises = result.data;
            res.send(exercises);
        } 
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });
  
  //modify an exercise
  router.put("/ex/:id", async (req, res, next) => { 
    let index = req.params.id;
    let { exerciseName, video, series, repetitions, notes } = req.body;
  
    try {
        let result = await db(`SELECT * FROM exercises WHERE id = ${index}`);
        if (result.data.length === 0) {
            res.status(404).send({ error: 'Exercise not found' });
        } else {
            let sql = `
                UPDATE exercises
                SET exerciseName = '${exerciseName}',
                video = '${video}',
                series = ${series},
                repetitions = ${repetitions},
                notes = '${notes}'
                WHERE id = ${index}
            `;
  
            await db(sql);
            let result = await db('SELECT * FROM exercises');
            let exercises = result.data;
            res.send(exercises);
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });
  
//THIS IS WHAT I DID IN MY PROJECT TO MODIFY ONE THING THAT WAS A BOOLEAN
// router.put("/days/:day_id/resolutions/:r_id", async (req, res) => {
//   let rId = req.params.r_id;

//   try {
    
//     let results = await db(`SELECT * FROM resolutions WHERE id = ${rId}`);
//     if (results.data.length === 0) {
//       // Resolution not found
//       res.status(404).send({ error: "Resolution not found" });
//     } else {
//       // Resolution found!
//       let { day_id, text, complete } = req.body;
//       let sql = `
//         UPDATE resolutions 
//         SET day_id = ${day_id}, text = '${text}', complete = ${complete}
//         WHERE id = ${rId}
//       `;
//       // Do the UPDATE
//       await db(sql);
      
//       let results = await db("SELECT * FROM resolutions");
//       res.send(results.data);
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });



  module.exports = router