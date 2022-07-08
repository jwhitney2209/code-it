const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Note, Category } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('notes')
          .populate('categories');

          return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find();
    },
    notes: async () => {
      return Note.find();
    },
    note: async (parent, { _id }) => {
      return Note.findOne({ _id });
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
    
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect Login Information');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Login Information');
      }
    
      return user;
    }
  }
}

module.exports = resolvers;