const express = require("express");
let router = express.Router();
const validateStudent = require("../../middlewares/validatestudent");
const { Student } = require("../../models/student");
//get Students
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let Students = await Student.find().skip(skipRecords).limit(perPage);
  return res.send(Students);
});
//get single Students
router.get("/:id", async (req, res) => {
  try {
    let Students= await Student.findById(req.params.id);
    if (!Student)
      return res.status(400).send("Student With given ID is not present"); //when id is not present id db
    return res.send(Students); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", validateStudent, async (req, res) => {
  let Students = await Student.findById(req.params.id);
  Student.name = req.body.name;
  Student.price = req.body.price;
  await Student.save();
  return res.send(Students);
});
//update a record
router.delete("/:id", async (req, res) => {
  let Students = await Student.findByIdAndDelete(req.params.id);
  return res.send(Students);
});
//Insert a record
// Insert a record
router.post("/", validateStudent, async (req, res) => {
  let newStudent = new Student();
  newStudent.id = req.body.id;
  newStudent.name = req.body.name;
  newStudent.marks = req.body.marks;
  await newStudent.save();
  return res.send(newStudent);
});

module.exports = router;
