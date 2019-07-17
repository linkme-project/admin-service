const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  userId: { type: String, required: true },
  regDate: { type: Date, default: Date.now }
}, {
  versionKey: false
});

module.exports = CommentSchema;