const bcrypt = require('bcrypt');
const { signToken, AuthenticationError } = require('../../utils/auth');
require('dotenv').config();
const { GraphQLError } = require('graphql');

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { User } = require('../../models');

module.exports = {
  Query: {
    async me(_, args, context) {
      const user = context.user;

      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      try {
        const userData = await User.find({ _id: user._id })
          .populate('notes')
          .populate('categories');
        return userData;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    }
  },
  Mutation: {
    async addUser(_, { username, email, password, confirmPassword }) {
      // validate user input 
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new GraphQLError(errors);
      }

      // check if user already exists
      const checkUser = await User.findOne({ email });

      if (checkUser) {
        throw new GraphQLError('This user already exists!');
      }

      const user = new User({
        username,
        email,
        password
      });

      const savedUser = await user.save();
    }
  }
}