const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  patientName: String,
  messageContent: String,
  patientPhoneNumber: String,
  employeeInitals: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
