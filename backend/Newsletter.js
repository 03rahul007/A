const { Resend } = require('resend');
const express = require("express");
const router = express.Router();
const resend = new Resend('re_Vw8jZ8CV_KJvQzNfABFo97J6bTMHnqQKN');
const NewsLetterModel = require('./Models/NewsletterModel');

router.post("/sendMail", async (req, res) => {
  const { email } = req.body;

  try {
    // Store the email in the database
    const userEmail = await NewsLetterModel.create({ email });

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Rahul <onboarding@resend.dev>', // Resend's default sender email
      to: [email],                          // Use the email from the request body
      subject: 'Greetings from Rahul!',
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Beautiful Email Message</title>
    <style>
      body {
        background-color: #f4f4f4;
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4f46e5;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .message-content {
        padding: 30px;
        color: #333;
      }
      .message-content h1 {
        font-size: 22px;
        color: #4f46e5;
        margin-bottom: 20px;
      }
      .message-content p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .message-content a {
        display: inline-block;
        background-color: #4f46e5;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 10px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        background-color: #f4f4f4;
        font-size: 14px;
        color: #888;
      }
      .footer a {
        color: #4f46e5;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Greetings from Rahul!</div>
      <div class="message-content">
        <h1>Welcome to Our Newsletter</h1>
        <p>
          Hi there, <br /><br />
          Thank you for subscribing to our newsletter. We are excited to bring
          you the latest updates and news from the tech world!
        </p>
        <p>
          Stay tuned for more awesome content, and feel free to
          <strong>reach out</strong> if you have any questions!
        </p>
        <a href="http://localhost:5173/">Visit Our Website</a>
      </div>
      <div class="footer">
        <p>
          Sent with ❤️ by Rahul Verma <br />
          <a href="#">Unsubscribe</a> from this newsletter.
        </p>
      </div>
    </div>
  </body>
</html>
`,
    });

    // Handle errors if any
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email", error });
    }

    // If successful
    console.log("Email sent successfully:", data);
    res.status(200).json({ message: "Email sent successfully", data });

  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
