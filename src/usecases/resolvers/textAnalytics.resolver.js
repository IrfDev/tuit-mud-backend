const TextAnalytics = require('../../Models/TextAnalytics');

const createTextAnalytics = (_, { input }) => {
  return TextAnalytics.create(input);
};

const getAllTextAnalytics = () => {
  return TextAnalytics.find({}).exec();
};

const getOne = (_, { id }) => {
  return TextAnalytics.findById(id).exec();
};

module.exports = {
  Query: {
    getAllTextAnalytics,
  },
  Mutation: {
    createTextAnalytics
  },
};