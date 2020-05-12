const TextAnalytics = require('../Models/TextAnalytics');

const create = (_, { input }) => {
  return TextAnalytics.create(input);
};

const getAll = () => {
  return TextAnalytics.find({}).exec();
};

const getOne = (_, { id }) => {
  return TextAnalytics.findById(id).exec();
};

module.exports = {
  Query: {
    getAll,
    getOne
  },
  Mutation: {
    create
  },
}