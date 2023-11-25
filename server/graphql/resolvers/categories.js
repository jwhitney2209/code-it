const { Category } = require('../../models');

module.exports = {
  Query: {
    async categories(_, args, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      try {
        const categories = await Category.find({ user: user._id })
          .populate('notes');

        return categories;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    }
  },
  }
}