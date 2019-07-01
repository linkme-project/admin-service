const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttachedFileSchema = new Schema({
    fileId: String,
    fileName: String,
    fileUrl: String
});

module.exports = AttachedFileSchema;