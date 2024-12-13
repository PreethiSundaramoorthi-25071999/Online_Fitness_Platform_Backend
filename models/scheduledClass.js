

//new
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  classType: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  capacity: { type: Number, required: true },
  availableSpots: { type: Number, required: true },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
