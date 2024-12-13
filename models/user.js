
//new
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  profilePic: { type: String },
  isTrainer: { type: String  },
  role: { type: String },
});

module.exports = mongoose.model('User', userSchema);
