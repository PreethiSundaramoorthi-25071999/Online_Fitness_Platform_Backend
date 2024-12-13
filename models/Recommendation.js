const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  preference: { type: String, required: true, unique: true },
  recommendation: { type: String, required: true },
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
