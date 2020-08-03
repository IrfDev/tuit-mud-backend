const express = require("express");
const router = express.Router();
const textAnalyticsUsecase = require("../usecases/TextAnalytics");
const userUsecase = require("../usecases/Users");
const nlu = require("../Lib/nlu");

router.post("/:type", async (req, res) => {
  const analyzeText = req.body;
  const twitterId = req.user.profile.twitterId;
  const type = req.params.type;
  const analyzeParams = {
    text: analyzeText.join(),
    language: "en",
    features: {
      categories: {
        limit: 10,
        explanation: true,
        syntax: true,
      },
      entities: {
        emotion: true,
        sentiment: true,
        keywords: true,
        limit: 5,
      },
      sentiment: {},
      keywords: {
        emotion: true,
        sentiment: true,
        keywords: true,
        relations: true,
        limit: 5,
      },
      concepts: {
        limit: 5,
      },
    },
  };
  try {
    const analysisResults = await nlu.analyze(analyzeParams);
    const newTextAnalyticsObject = await textAnalyticsUsecase.create({
      user: twitterId,
      type,
      ...analysisResults.result,
    });
    await userUsecase.update(twitterId, {
      textAnalytics: newTextAnalyticsObject._id,
    });
    res.json({
      success: true,
      message: "Concept",
      data: analysisResults.result,
    });
  } catch (errors) {
    res.json({
      success: false,
      message: "No se consiguieron analizar los twitts",
      error: errors,
    });
  }
});

module.exports = router;
