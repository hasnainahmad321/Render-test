const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,validate} = require("../models/user");
const auth = require('../middleware/auth')

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    console.log("error fetching user", e);
  }
});
router.get("/:id/", (req, res) => {
  console.log(req.params.id, req);
  res.send("hello word from /user/:id endpoint!" + req.params.id);
});
router.post("/", async (req, res) => {
  const user = req.body;
  //validation
  const{error}=validate(user);
  if(error){
    return res.status(400).send(error.details[0].message)
  }
  try {
    const dbUser = await User.findOne({ email: user.email });
    if (dbUser) {
      return res.send("Use is already exist");
    }

    const salt = await bcrypt.genSalt(10);
    console.log("Salt", salt);
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user);
    const newUser = new User(user);

    const savedUser = await newUser.save();
    console.log(savedUser);
    return res.send(savedUser);
  } catch (e) {
    console.log(" error creating user:", e);
    res.send("error creating user");
  }
  console.log(user);
});
router.put("/:id",async(req,res)=>{
  console.log("Put User:")
  try{
    let user=await User.findById(req.params.id)
    user.course.push(req.body)
    const updateuser=await user.save()
    return res.status(200).send(updateuser)
  }catch(e){
    console.log("err is here",e)
    return res.send(e)
  }

})
module.exports = router;
