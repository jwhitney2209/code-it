const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const noteSchema = new Schema(
  {
    noteText: {
      type: String,
      required: 'You need to leave a note!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    }
  }
);

const Note = model('Note', noteSchema);

module.exports = Note;