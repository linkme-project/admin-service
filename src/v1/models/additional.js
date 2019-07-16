const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdditionalSchema = new Schema({
  startDate: String,
  endDate: String,
  regUsers: Array
}, {
  versionKey: false,
  _id: false
});

module.exports = AdditionalSchema;