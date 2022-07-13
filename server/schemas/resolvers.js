const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Category, Note } = require("../models");

const resolvers = {
  Query: {
    // Current User (Yourself)
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("categories")
          .populate("notes");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find().select("-__v -password").populate("categories");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('categories');
    },
    // find categories by userId
    categories: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Category.find(params).populate("notes");
    },
    category: async (parent, { _id }) => {
      return await Category.findOne({ _id }).populate("notes");
    },
    note: async (parent, { _id }) => {
      console.log({ _id });
      return Note.findOne({ _id });
    },
    notes: async (parents, args, context) => {
      if (context.user) {
        return Note.find();
      }
    },
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
        throw new AuthenticationError("Incorrect Login Information");
      }

      // check if password is correct
      const correctPw = await user.isCorrectPassword(password);

      // if the password for this user is incorrect then prompt
      if (!correctPw) {
        throw new AuthenticationError("Incorrect Login Information");
      }

      // if login success then assign the user a token
      const token = signToken(user);
      return { token, user };
    },
    addCategory: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user);
        const category = await Category.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { categories: category } },
          { new: true }
        );

        return category;
      }

      throw new AuthenticationError("You must be logged in to save a note!");
    },
    addNote: async (parent,{ noteTitle, noteText, noteSnippet, tag },context) => {
      if (context.user) {
        const note = await Note.create({
          tag,
          noteTitle,
          noteText,
          noteSnippet,
          userId: context.user._id,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id},
          { $push: {notes: note}},
          { new: true }
        )

        return note;
      }
    },
    removeNote: async (parent, { _id }, context) => {
      console.log('login id:', _id)
      const note = await Note.findByIdAndDelete({ _id })
      return note;
    },
  },
};

module.exports = resolvers;
