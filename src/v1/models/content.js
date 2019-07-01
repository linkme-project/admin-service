const mongoose = require('mongoose');
const AttachedFile = require('./attachedFile');
const Comment = require('./comment');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  sn: Number,
  title: String,
  content: String,
  userId: String,
  attachedFiles: [AttachedFile],
  comments: [Comment],
  regDate: Date,
  type: Number
});

module.exports = mongoose.model('Content', ContentSchema);