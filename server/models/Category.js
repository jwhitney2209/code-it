const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Note'
      }
    ]
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