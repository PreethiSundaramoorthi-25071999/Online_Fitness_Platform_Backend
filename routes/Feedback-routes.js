

//latest
const express = require("express");
const { submitFeedback, getFeedback } = require("../controllers/feedback-controller");

const router = express.Router();

// POST route for submitting feedback
router.post("/", submitFeedback);

// GET route for fetching feedback for a specific trainer
router.get("/:trainerId", getFeedback);

module.exports = router;

