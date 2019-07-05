const mongoose = require('mongoose');
const AttachedFile = require('./attachedFile');
const Comment = require('./comment');
const Additional = require('./additional');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  sn: Number,
  title: String,
  content: String,
  userId: String,
  thumbnail: String,
  additional: Additional,
  attachedFiles: [AttachedFile],
  comments: [Comment],
  regDate: Date,
  type: Number,
  key: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Content', ContentSchema);