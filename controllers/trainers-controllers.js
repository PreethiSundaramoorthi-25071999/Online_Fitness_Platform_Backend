const Trainer = require('../models/trainer');

// Controller to create a new trainer
exports.createTrainer = async (req, res) => {
  const { name, expertise, imageUrl } = req.body;

  try {
    const newTrainer = new Trainer({ name, expertise, imageUrl });
    await newTrainer.save();
    res.status(201).json({ message: 'Trainer added successfully', trainer: newTrainer });
  } catch (error) {
    res.status(500).json({ message: 'Error adding trainer', error: error.message });
  }
};

// Controller to get all trainers
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainers', error: error.message });
  }
};

// Controller to get a trainer by ID
exports.getTrainerById = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainer', error: error.message });
  }
};

// Controller to update a trainer's information
exports.updateTrainer = async (req, res) => {
  const { id } = req.params;
  const { name, expertise, imageUrl } = req.body;

  try {
    const trainer = await Trainer.findByIdAndUpdate(id, { name, expertise, imageUrl }, { new: true });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json({ message: 'Trainer updated successfully', trainer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating trainer', error: error.message });
  }
};

// Controller to delete a trainer
exports.deleteTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findByIdAndDelete(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trainer', error: error.message });
  }
};
