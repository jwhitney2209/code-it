const { GraphQLError } = require("graphql");
const { signToken } = require("../utils/auth");
const { User, Category, Note } = require("../models");

const resolvers = {
  Query: {
    // Current User (Yourself)
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
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
        .select("-__v -password")
        .populate("categories");
    },
    // find categories by userId
    categories: async (parent, args, context) => {
      const user = context.user;
      
      if (!user) {
        throw new GraphQLError("You must be logged in to do this!");
      }

      try {
        const categories = await Category.find({ userId: context.user._id });
        return categories;
      } catch (err) {
        console.log(err);
      }
    },
    category: async (parent, { _id }) => {
      return await Category.findOne({ _id }).populate("notes");
    },
    note: async (parent, { _id }) => {
      console.log({ _id });
      return Note.findOne({ _id });
    },
    notes: async (parents, args, context) => {
      const user = context.user;
      if (!user) {
        throw new GraphQLError("You must be logged in to do this!");
      }
      const notes = await Note.find({ userId: context.user._id });
      return notes;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const { username, email, password } = args;
      // create a user based on arguments passed in : arguments are the sign-up details

      const user = new User({
        username,
        email,
        password,
      });

      await user.save();
      console.log(user);
      const token = signToken(user);

      return { token: token, user: user };
    },
    login: async (parent, { email, password }) => {
      // find user by email
      const user = await User.findOne({ email });

      // if there is no email for that user then prompt
      if (!user) {
        throw new GraphQLError("Incorrect Login Information");
      }

      // check if password is correct
      const correctPw = await user.isCorrectPassword(password);

      // if the password for this user is incorrect then prompt
      if (!correctPw) {
        throw new GraphQLError("Incorrect Login Information");
      }

      // if login success then assign the user a token
      const token = signToken(user);
      return { token: token, user: user };
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

      throw new GraphQLError("You must be logged in to save a note!");
    },
    addNote: async (
      parent,
      { noteTitle, noteText, noteSnippet, tag },
      context
    ) => {

      const user = context.user;
      if (!user) {
        throw new GraphQLError("You must be logged in to save a note!");
      }

      const note = await Note.create({
        tag,
        noteTitle,
        noteText,
        noteSnippet,
        userId: context.user._id,
      });
      await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { notes: note } },
        { new: true }
      );

      return note;
    },
    removeNote: async (parent, { _id }, context) => {
      console.log("login id:", _id);
      const note = await Note.findByIdAndDelete({ _id });
      return note;
    },
  },
};

module.exports = resolvers;
