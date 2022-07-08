const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Category } = require('../models');

const resolvers = {
  Query: {
    // Current User (Yourself)
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('categories');
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('categories')
    },
    // find categories by userId
    categories: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      return Category.find(params)
        .populate('notes');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      // create a user based on arguments passed in : arguments are the sign-up details
      const user = await User.create(args);
      // assign the created user a token
      const token = signToken(user);
    
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // find user by email
      const user = await User.findOne({ email });
    
      // if there is no email for that user then prompt 
      if (!user) {
        throw new AuthenticationError('Incorrect Login Information');
      }
    
      // check if password is correct
      const correctPw = await user.isCorrectPassword(password);

      // if the password for this user is incorrect then prompt
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Login Information');
      }
    
      // if login success then assign the user a token
      const token = signToken(user);
      return { token, user };
    },
    addCategory: async (parent, args, context) => {
      if (context.user) {
        const category = await Category.create({ ...args, userId: context.user._id });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { categories: category._id } },
          { new: true }
        );

        return category;
      }

      throw new AuthenticationError('You must be logged in to save a note!')
    },
    addNote: async (parent, { categoryId, noteTitle, noteText, noteSnippet }, context) => {
      if (context.user) {
        const updatedCategory = await Category.findByIdAndUpdate(
          { _id: categoryId },
          { $push: { notes: { noteTitle, noteText, noteSnippet, username: context.user._id } } },
          { new: true, runValidators: true }
        )

        return updatedCategory;
      }
      throw new AuthenticationError('You must be logged in to save a note!')
    }
  }
};

module.exports = resolvers;