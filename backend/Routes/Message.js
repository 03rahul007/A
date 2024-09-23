const express = require("express");
const messageModel = require('../Models/MessageModel')
const router = express.Router();

router.post("/message", async (req, res) => {
  // Extract email and password from the request body
  const { name, message } = req.body;

  try {
     const msg = await messageModel.create({ name, message})
     res.status(201).json(message);
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
});

module.exports = router;
