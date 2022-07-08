const { Schema, model } = require('mongoose');
const noteSchema = require('./Note');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 20
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: [noteSchema]
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