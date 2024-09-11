const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user"); //statuscode
const jwt = require("jsonwebtoken");
const Joi=require("joi")
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // Joi:if invalid body return error db ma data send karny se ply ccheck ley data sahi hai or nahi
    // joi se ap check kartey hain req sahi hai or nahi or validation:mongoose sechma validation   :rtegex check karta
    const schema=Joi.object({
      email:Joi.string().email().required(),
      password: Joi.string().required()
    })
    const result=schema.validate(req.body)
    if(result.error){
      console.log(result.error)
      return res.status(400).send("Invalid credentials")
    }
    if (!user) {
      return res.status(400).send("Incorrect email or password ");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("Valid password", isValidPassword);
    if (isValidPassword) {
      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET
      );
      return res.status(200).send(token);
    }
    return res.status(400).send("incorroect passwor or email");
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
