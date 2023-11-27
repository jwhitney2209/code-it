const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Category = model("Category", categorySchema);

module.exports = Category;
