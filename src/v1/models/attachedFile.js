const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttachedFileSchema = new Schema({
  fileId: String,
  fileName: String,
  fileUrl: String,
  fileSize: Number
}, {
  versionKey: false,
  _id: false
});

module.exports = AttachedFileSchema;