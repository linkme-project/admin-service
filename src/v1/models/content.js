const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const AttachedFile = require('./attachedFile');
const Comment = require('./comment');
const Additional = require('./additional');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true, trim: true },
  thumbnail: { type: String, trim: true },
  additional: Additional,
  attachedFiles: [AttachedFile],
  comments: [Comment],
  regDate: { type: Date, default: Date.now },
  type: { type: String, required: true },
  key: { type: String }
}, {
  versionKey: false,
  _id: false
});

ContentSchema.plugin(autoIncrement.plugin, { model: 'content', field: 'sn', startAt: 1 });
module.exports = mongoose.model('content', ContentSchema);