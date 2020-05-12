const User = require('../../Models/User');

const createUser = (_, { input }) => {
  return User.create(input);
};

const getAllUsers = () => {
  return User.find({}).exec();
}

const getOne = (_, { id }) => {
  return User.findById(id).exec();
}


module.exports = {
  Query: {
    getAllUsers,
  },
  Mutation: {
    createUser,
  },
};