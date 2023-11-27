const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: 'You must add a Title',
      minlength: 1,
      maxlength: 100
    },
    description: {
      type: String,
      required: 'You need to leave a note!',
      minlength: 1,
      maxlength: 280
    },
    snippet: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Note = model('Note', noteSchema);

module.exports = Note;