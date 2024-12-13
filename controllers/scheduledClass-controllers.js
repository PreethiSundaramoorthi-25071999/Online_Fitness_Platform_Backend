//new

// Import dependencies
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Schedule = require("../models/scheduledClass");

// Create a schedule
const createschedule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { type, date, duration, capacity } = req.body;
  const newSchedule = new Schedule({
    classType: type,
    date,
    duration,
    capacity,
    availableSpots: capacity,
  });

  try {
    const savedSchedule = await newSchedule.save();
    res.status(201).json({
      message: "Schedule created successfully!",
      schedule: savedSchedule,
    });
  } catch (err) {
    console.error("Error saving schedule:", err);
    res.status(500).json({ message: "Failed to create schedule." });
  }
};

// Get all schedules
const getScheduleClass = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json({
      message: "Classes retrieved successfully.",
      schedules: schedules,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a schedule
const updateSchedule = async (req, res) => {
  try {
    const { _id, classType, date, duration, capacity } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Schedule ID is required." });
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      _id,
      { classType, date, duration, capacity },
      { new: true, runValidators: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    res.status(200).json(updatedSchedule);
  } catch (err) {
    console.error("Error updating schedule:", err);
    res.status(500).json({
      message: "Failed to update schedule.",
      error: err.message,
    });
  }
};

// Delete a schedule
const deleteScheduleClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await Schedule.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found." });
    }

    res.status(200).json({ message: "Class deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export functions
module.exports = {
  createschedule,
  getScheduleClass,
  updateSchedule,
  deleteScheduleClass,
}