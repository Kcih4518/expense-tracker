// Require node_modules
const mongoose = require('mongoose')

// Define records schema
// date: type Date, the stored value is 2021-07-28 00:00:00.000Z
// To avoid the need to process the string later, so directly use type String to store.
const Schema = mongoose.Schema
const recordsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Record', recordsSchema)
