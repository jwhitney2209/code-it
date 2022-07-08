const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Note'
      }
    ]
  }
)

const Category = model('Category', categorySchema);

module.exports = Category;