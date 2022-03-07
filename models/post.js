const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: Object,
    required: true
  }
}, { timestamps: true }); // by adding "timestamps" mongoose will create a column createdAt, updatedAt timestamp

module.exports = mongoose.model('Post', postSchema);
