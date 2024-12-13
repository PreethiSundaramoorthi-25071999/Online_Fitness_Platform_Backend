const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//
const cors = require('cors');
//
const trainerRoutes = require('./routes/trainer-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const scheduleRoutes = require("./routes/schedule-routes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const feedbackRoutes = require("./routes/Feedback-routes")

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/trainers', trainerRoutes);
app.use('/api/users', usersRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use('/api/preference', recommendationRoutes);
app.use("/api/feedback", feedbackRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect('mongodb+srv://preethisundharps:WLvifNNAPEe22u78@cluster0.102of.mongodb.net/fitness_platform_new')
  .then(() => {
    console.log('connection success')
    app.listen(5001);
  })
  .catch(err => {
    console.log(err);
  });

