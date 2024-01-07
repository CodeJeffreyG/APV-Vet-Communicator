const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  date: Date,
  patientName: String,
  messageContent: String,
  patientPhoneNumber: String,
  employeeInitals: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
