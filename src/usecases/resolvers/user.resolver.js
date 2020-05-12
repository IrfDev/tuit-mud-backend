const User = require('../Models/User');

const create = (_, { input }) => {
  return User.create(input);
};

const getAll = () => {
  return User.find({}).exec();
}

const getOne = (_, { id }) => {
  return User.findById(id).exec();
}


module.exports = {
  Query: {
    getAll,
    getOne,
  },
  Mutation: {
    create,
  },
};