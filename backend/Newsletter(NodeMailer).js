// const express = require("express");
// const nodemailer = require("nodemailer");

// const router = express.Router();

// // router.get('/sendMail',sendMail)

// router.get("/sendMail", async (req, res) => {
//      console.log("send mail");
     
//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for port 465, false for other ports
//     auth: {
//       user: "kailyn43@ethereal.email",
//       pass: "kq7vjSFsggBDU2rRqZ",
//     },
//   });

//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Rahul 👻" <irahul.exe@gmail.com>', // sender address
//       to: "irahul.exe@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }

//   main().catch(console.error);
// });

// module.exports = router;