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
    }
  },
  Mutation: {
    async addNote(_, { title, description, snippet, categoryId }, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      const category = await Category.findById(categoryId);
      try {
        const note = new Note({
          title,
          description,
          snippet,
          category: category._id,
          userId: user._id
        });

        await note.save();

        console.log(note)
        const userDoc = await User.findById(user._id);
        userDoc.notes.push(note._id);
        await userDoc.save();

        return note;
      } catch (err) {
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