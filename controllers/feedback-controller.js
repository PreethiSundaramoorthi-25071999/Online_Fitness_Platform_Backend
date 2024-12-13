
//latest
const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { trainerId, rating, comment } = req.body;

    if (!trainerId || !rating || !comment) {
      return res.status(400).json({ message: "Trainer ID, rating, and comment are required." });
    }

    const feedback = new Feedback({ trainerId, rating, comment });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully.", feedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Failed to submit feedback." });
  }
};

const getFeedback = async (req, res) => {
  try {
    const { trainerId } = req.params;

    if (!trainerId) {
      return res.status(400).json({ message: "Trainer ID is required." });
    }

    // Fetch all feedback for the specified trainer
    const feedbacks = await Feedback.find({ trainerId });

    res.status(200).json({
      message: feedbacks.length ? "Feedback retrieved successfully." : "No feedback available for this trainer.",
      feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Failed to retrieve feedback." });
  }
};

module.exports = { submitFeedback, getFeedback };
