const { Schema, model } = require('mongoose');
const Note = require('./Note');

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20
    },
    username: {
      type: String,
      required: true
    },
    notes: [Note.schema]
  },
  {
    toJSON: {
      getters: true
    }
  }
)

categorySchema.virtual('noteCount').get(function() {
  return this.notes.length;
});

const Category = model('Category', categorySchema);

module.exports = Category;