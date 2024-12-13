

//new
const Recommendation = require('../models/Recommendation');
const HttpError = require('../models/http-error');

const getRecommendations = async (req, res, next) => {
  const { preference } = req.body;

  try {
    const recommendation = await Recommendation.findOne({ preference });
    if (!recommendation) {
      return next(new HttpError('No recommendation found for the selected preference.', 404));
    }

    res.status(200).json({ recommendations: [recommendation.recommendation] });
  } catch (error) {
    return next(new HttpError('Fetching recommendations failed, please try again later.', 500));
  }
};

module.exports = { getRecommendations };
