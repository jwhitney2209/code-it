const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Note } = require('../models');

const resolvers = {
  Query: {
    // Current User (Yourself)
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
      return User.find()
        .select('-__v -password')
        .populate('category')
        .populate('notes');
    },
    notesByUserId: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      return Note.find(params)
        .populate('category');
    }
  },
  User: {

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
        const categoryName = args; // at this point I'm just winging it
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { category: categoryName } },
          { new: true }
        )
      }
    },
    addNote: async (parent, args, context) => {
      if (context.user) {
        const note = await Note.create({ ...args, userId: context.user._id });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { notes: note._id } },
          { new: true }
        );

        return note;
      }

      throw new AuthenticationError('You must be logged in to save a note!')
    },
    editNote: async (parent, { _id }, context) => {
      if (context.user) {
        const editNote = await Note.findByIdAndUpdate({ ...args, _id });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { notes: editNote._id }}
        )
      }

    }
  }
}

module.exports = resolvers;