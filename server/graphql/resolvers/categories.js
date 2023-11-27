const { Category, User } = require('../../models');

module.exports = {
  Query: {
    async categories(_, args, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      try {
        const categories = await Category.find({ userId: user._id })
          .populate('notes');

        return categories;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    }
  }, 
  Mutation: {
    async addCategory(_, { name }, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      try {
        const newCategory = new Category({
          name,
          userId: user._id
        });

        const category = await newCategory.save();

        // retrieve user document
        const userDoc = await User.findById(user._id);
        if (!userDoc) {
          throw new Error('User not found!');
        }

        userDoc.categories.push(category._id);

        await userDoc.save();

        return category;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    },
    async removeCategory(_, { categoryId }, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      try {
        const category = await Category.findByIdAndDelete(categoryId);

        return `Category ${category.name} has been deleted!`;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    },
    async updateCategory(_, { categoryId, name }, context) {
      const user = context.user;
      if (!user) {
        throw new Error('You must be logged in to perform this action!');
      }

      try {
        // update category
        const category = await Category.findByIdAndUpdate(
          categoryId,
          { name },
          { new: true }
        );

        return category;
      } catch (err) {
        throw new Error('Something went wrong with this request!');
      }
    },
  }
}