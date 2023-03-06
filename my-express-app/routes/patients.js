var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET patients */
router.get("/", async (req, res, next) => {
  try {
      let results = await db('SELECT * FROM patients');
      let patients = results.data;
      res.send(patients);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

//search by name
router.get('/search', function(req, res, next) {
  const {search} = req.query
  db(`SELECT * FROM patients WHERE firstName LIKE '%${search}%' OR lastName LIKE '%${search}%'`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one patient by id
router.get("/:id", async function(req, res, next) {
  let patientId = req.params.id;

  try {
    let results = await db(`SELECT * FROM patients WHERE id = ${patientId}`);
    let patients = results.data;
    if (patients.length === 0) {
      //patients array is empty so no patients found
      res.status(404).send({ error: "Patient not found" });
    } else {
      res.send(patients[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET programs of one patient (if more than one)
// router.get("/:patientId/programs", async function(req, res, next) {
//   let index = req.params.patientId;

//   try {
//     let results = await db(`SELECT *  
//     FROM programs
//     WHERE patientId = ${index}`);
    
//     let programs = results.data;
//     if (programs.length === 0) {
//       //students array is empty so no students found
//       res.status(404).send({ error: "Program not found" });
//     } else {
//       res.send(programs);
//     }
//     res.send(programs)
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

//post a new patient
router.post("/", async (req, res, next) => {
  let { firstName, lastName, birthDate, email } = req.body;
  console.log(req.body);
  let sql = `
      INSERT INTO patients (firstName, lastName, birthDate, email)
      VALUES ('${firstName}', '${lastName}', '${birthDate}', '${email}')
  `;

  try {
      await db(sql);  // add new patient
      let result = await db('SELECT * FROM patients');
      let patients = result.data;
      res.status(201).send(patients);  // return updated array (with 201 for "new resource created")
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

//delete a patient
router.delete("/:id", async (req, res, next) => {
  let index = req.params.id;

  try {
      let result = await db(`SELECT * FROM patients WHERE id = ${index}`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Patient not found' });
      } else {
          await db(`DELETE FROM patients WHERE id = ${index}`);
          let result = await db('SELECT * FROM patients');
          let patients = result.data;
          res.send(patients);
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

//modify a patient
router.put("/:id", async (req, res, next) => {
  let index = req.params.id;
  let { firstName, lastName, birthDate, email } = req.body;

  try {
      let result = await db(`SELECT * FROM patients WHERE id = ${index}`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Patient not found' });
      } else {
          let sql = `
              UPDATE patients 
              SET firstName = '${firstName}', lastName = '${lastName}', birthDate = '${birthDate}', email= '${email}'
              WHERE id = ${index}
          `;

          await db(sql);
          let result = await db('SELECT * FROM patients');
          let patients = result.data;
          res.send(patients);
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});




module.exports = router;
