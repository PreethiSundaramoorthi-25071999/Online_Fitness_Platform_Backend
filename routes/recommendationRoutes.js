const express = require('express');
const router = express.Router();

router.post('/recommendations', (req, res) => {
  const { preference } = req.body;

  if (!preference) {
    return res.status(400).json({ message: 'Preference is required' });
  }

  // Mock recommendation logic based on preference
  let recommendations = [];
  switch (preference) {
    case 'Weight Gain':
      recommendations = ['Strength Training', 'Body Pump', 'Pilates'];
      break;
    case 'Weight Loss':
      recommendations = ['HIIT', 'Cardio', 'Zumba'];
      break;
    case 'To Maintain Fitness':
      recommendations = ['Yoga', 'Aqua Aerobics', 'Meditation'];
      break;
    case 'To Reduce Stress':
      recommendations = ['Meditation', 'Yoga', 'Pilates'];
      break;
    default:
      recommendations = ['General Fitness Classes'];
  }

  res.json({ recommendations });
});

module.exports = router;
