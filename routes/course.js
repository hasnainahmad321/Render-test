const express = require("express");
const router = express.Router();
const course = require("../models/course");
router.get("/", async (req, res) => {
  try {
    const course = await course.find();
    return res.status(200).send(course);
  } catch (e) {
    return res.status(500).send("An error occured");
  }
});
router.post("/", async (req, res) => {
  const coursedata = req.body;
  try {
    const newcourse = new course(coursedata);
    console.log(newcourse);
    const savedcourse = await newcourse.save();
    res.send(JSON.stringify(savedcourse));
  } catch (e) {
    return res.status(500).send("course not saved");      // tightly coupled nested     losely coupled  ref
                                                           // read ride function
  }
});

module.exports = router;