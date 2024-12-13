
//new
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
