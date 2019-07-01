const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  commentId: String,
  content: String,
  userId: String,
  regDate: Date
});

module.exports = CommentSchema;