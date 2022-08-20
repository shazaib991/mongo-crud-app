const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("dotenv").config();

const uri = process.env.uri;

mongoose
  .connect(uri)
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err.message));

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const Student = mongoose.model("Students", StudentSchema);

// GET students data
// ENDPOINT: /api/v1/students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.send(students);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

// POST student data
// ENDPOINT: /api/v1/students
router.post("/", async (req, res) => {
  try {
    const student = await Student.insertMany(req.body);
    res.json({ messsage: "student created successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

// UPDATE student data
// ENDPOINT: /api/v1/students/studentID
router.patch("/:id", async (req, res) => {
  try {
    const student = await Student.updateOne({ _id: req.params.id }, req.body);
    res.json({ msg: "student updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

// DELETE student data
// ENDPOINT: /api/v1/students/studentID
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.remove({ _id: req.params.id });
    res.json({ msg: "student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;
