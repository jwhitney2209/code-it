const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const noteSchema = new Schema(
  {
    noteTitle: {
      type: String,
      required: 'You must add a Title',
      minlength: 1,
      maxlength: 100
    },
    noteText: {
      type: String,
      required: 'You need to leave a note!',
      minlength: 1,
      maxlength: 280
    },
    noteSnippet: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Note = model('Note', noteSchema);

module.exports = Note;