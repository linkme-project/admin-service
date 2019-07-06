const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  userId: String,
  regDate: { type: Date, default: Date.now }
}, {
  versionKey: false
});

module.exports = CommentSchema;