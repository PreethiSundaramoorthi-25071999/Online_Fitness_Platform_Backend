const express = require('express');
const router = express.Router();
const {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} = require('../controllers/trainers-controllers');

// Route to create a new trainer
router.post('/add', createTrainer);

// Route to get all trainers
router.get('/', getAllTrainers);

// Route to get a single trainer by ID
router.get('/:id', getTrainerById);

// Route to update a trainer's information
router.put('/:id', updateTrainer);

// Route to delete a trainer
router.delete('/:id', deleteTrainer);

module.exports = router;
