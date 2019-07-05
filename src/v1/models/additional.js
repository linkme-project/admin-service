const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdditionalSchema = new Schema({
  startDate: String,
  endDate: String,
  regUsers: Array
}, {
  versionKey: false
});

module.exports = AdditionalSchema;