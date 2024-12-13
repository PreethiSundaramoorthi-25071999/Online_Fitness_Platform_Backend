
// new
const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

// Check if the model exists, or define it if it doesn't
const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;


// mongoose.models.Trainer || 