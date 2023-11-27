const { Note, User, Category } = require('../../models');

module.exports = {
  Query: {
    async notes(_, args, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      try {
        const notes = await Note.find({ userId: user._id }).populate('category').populate('userId');

        return notes;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    },
    async note(_, { noteId }, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      try {
        const note = await Note.findById(noteId).populate('category').populate('userId');

        return note;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    }
  },
  Mutation: {
    async addNote(_, { title, description, snippet, categoryId }, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('Category not found!');
      }
      try {
        let note = new Note({
          title,
          description,
          snippet,
          category: category._id,
          userId: user._id
        });

        await note.save();

        note = await note.populate('category');

        const userDoc = await User.findById(user._id);
        userDoc.notes.push(note._id);
        await userDoc.save();

        return note;
      } catch (err) {
        console.log(err);
        throw new Error('Something went wrong with this request!');
      }
    },
    async removeNote(_, { noteId }, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      try {
        const note = await Note.findByIdAndDelete(noteId);

        return `Note ${note.title} has been deleted!`;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    }
  }
}