require("dotenv").config(); // for env
const express = require("express");

const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const courseRouter = require("./routes/course");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
// app.use((req, res, next) => {
//   //
//   console.log("hello middleware");
//   if (req.body.name) {
//     next();
//   } else {
//     return res.send("No body dected");
//   }
// });
app.use("/user", usersRouter);
app.use("/course", courseRouter);
const connectionString = process.env.MONGO_DB_URL;
console.log("MONGO_URL", connectionString);
mongoose
  .connect(connectionString, {
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
  })
  .then(() => {
    console.log("Connect to DB");
  })
  .catch((err) => {
    console.log(err, "not connect db");
  });

app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Listning on port " ,process.env.PORT);
});
