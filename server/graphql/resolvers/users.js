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
        const userData = await User.findById(user._id)
          .populate({
            path: 'notes',
            populate: { path: 'category' }
          })
          .populate('categories');

        return userData;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    }
  },
  Mutation: {
    async addUser(_, { username, email, password, confirmPassword }) {
      const checkUser = await User.findOne({ email });

      if (checkUser) {
        throw new GraphQLError('This user already exists!');
      }

      const user = new User({
        username,
        email,
        password
      });

      await user.save();

      const token = signToken(user);

      return {
        token: token, user: user
      }
    },
    async login(_, { email, password }) {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError('Invalid credentials!');
      }

      const correctPw = await bcrypt.compare(password, user.password);

      if (!correctPw) {
        throw new GraphQLError('Invalid credentials!');
      }

      const token = signToken(user);

      return {
        token: token, user: user
      }
    }
  }
}