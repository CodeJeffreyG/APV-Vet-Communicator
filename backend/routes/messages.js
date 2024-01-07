const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/", async (request, response) => {
  try {
    const message = await Message.find();
    response.send(message);
  } catch (error) {
    response
      .status(500)
      .send("an error occured with the get request involving messages");
  }
});

router.post("/", async (request, response) => {
  const message = new Message({
    date: request.body.date,
    patientName: request.body.patientName,
    messageContent: request.body.messageContent,
    patientPhoneNumber: request.body.patientPhoneNumber,
    employeeInitals: request.body.employeeInitals,
  });

  try {
    savedMessage = await message.save();
    response.status(201).send(savedMessage);
  } catch (error) {
    response.status(400).send("Error saving message");
  }
});

module.exports = router;
