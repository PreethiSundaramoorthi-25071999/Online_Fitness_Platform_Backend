const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Mongoose Schemas and Models
const bookingSchema = new mongoose.Schema({
  id: String,
  trainerId: String,
  type: String,
  duration: String,
  schedule: [String],
  capacity: Number,
  availableSpots: Number,
  bookings: [
    {
      userId: String,
      date: Date,
      time: String,
      amPm: String,
    },
  ],
});

const Booking = mongoose.model("Booking", bookingSchema);

// Routes
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, date, time, amPm } = req.body;

  try {
    const booking = await Booking.findOne({ id });
    if (!booking) {
      return res.status(404).json({ error: "Class not found" });
    }

    if (booking.availableSpots <= 0) {
      return res.status(400).json({ error: "No spots available for this class" });
    }

    // Update available spots and add booking
    booking.availableSpots -= 1;
    booking.bookings.push({ userId, date, time, amPm });
    await booking.save();

    res.json({ message: "Class booked successfully", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add seed data route (optional, for initial setup)
app.post("/api/bookings/seed", async (req, res) => {
  const bookingData = [
    { id: "101", trainerId: "3", type: "Yoga", duration: "60 min", schedule: ["2024-11-11T09:00:00Z"], capacity: 10, availableSpots: 5 },
    { id: "102", trainerId: "4", type: "Strength Training", duration: "45 min", schedule: ["2024-11-06T18:00:00Z"], capacity: 12, availableSpots: 2 },
    { id: "103", trainerId: "5", type: "Cardio", duration: "30 min", schedule: ["2024-11-05T17:00:00Z"], capacity: 15, availableSpots: 0 },
    { id: "104", trainerId: "3", type: "Pilates", duration: "60 min", schedule: ["2024-11-06T10:00:00Z"], capacity: 8, availableSpots: 4 },
    { id: "105", trainerId: "4", type: "HIIT", duration: "30 min", schedule: ["2024-11-07T19:00:00Z"], capacity: 20, availableSpots: 15 },
    { id: "106", trainerId: "5", type: "Zumba", duration: "45 min", schedule: ["2024-11-08T18:00:00Z"], capacity: 15, availableSpots: 5 },
    { id: "107", trainerId: "3", type: "Kickboxing", duration: "60 min", schedule: ["2024-11-09T17:00:00Z"], capacity: 10, availableSpots: 3 },
    { id: "108", trainerId: "4", type: "Body Pump", duration: "45 min", schedule: ["2024-11-10T16:00:00Z"], capacity: 12, availableSpots: 6 },
    { id: "109", trainerId: "5", type: "Aqua Aerobics", duration: "50 min", schedule: ["2024-11-11T15:00:00Z"], capacity: 10, availableSpots: 0 },
    { id: "110", trainerId: "3", type: "Meditation", duration: "30 min", schedule: ["2024-11-12T08:00:00Z"], capacity: 20, availableSpots: 20 }
  ];

  try {
    await Booking.insertMany(bookingData);
    res.json({ message: "Seed data added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
