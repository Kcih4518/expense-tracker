// Require node_modules
const mongoose = require('mongoose')

// Define records schema
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  icon: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = mongoose.model('Category', categorySchema)
