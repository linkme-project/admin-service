const mongoose = require('mongoose');
const AttachedFile = require('./attachedFile');
const Comment = require('./comment');
const Additional = require('./additional');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  sn: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true, trim: true },
  thumbnail: { type: String, trim: true },
  additional: Additional,
  attachedFiles: [AttachedFile],
  comments: [Comment],
  regDate: { type: Date, default: Date.now },
  type: { type: Number, required: true },
  key: { type: String }
}, {
  versionKey: false
});

module.exports = mongoose.model('Content', ContentSchema);