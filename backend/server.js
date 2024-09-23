require("dotenv").config();
require("./Models/DB");
const express = require("express");
const app = express();
const path = require("path");
const Signup = require("./Routes/Signup");
const Login = require("./Routes/Login");
const UpdatePassword = require("./Routes/UpdatePassword");
const Newsletter = require("./Newsletter");
const OtpVerify = require('./Routes/otpVerify')
const Message = require('./Routes/Message')
const cookie = require("cookie-parser");
const cors = require('cors');

app.use(cors({
  origin: 'https://a-1-vaxt.onrender.com/', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://a-1-vaxt.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // If it's a preflight request, respond with 200
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});


// app.use(cors());
// ---------Middlewares-----------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
// --------------------
// const start = async(req,res,next)=>{
// next()
// }
// ---------Routes-----------
app.use(Signup);
app.use(Login);
app.use(UpdatePassword);
app.use(Newsletter);
app.use(OtpVerify);
app.use(Message);
app.get('/', (req, res) => {
  res.send("Server Running ...");
});
// --------------------

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
