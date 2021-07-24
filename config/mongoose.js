const mongoose = require('mongoose')
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
// Setting mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// 1. Get database connection status
const db = mongoose.connection

// 2. Connection exception handling
db.on('error', () => {
  console.log('mongodb error!')
})

// 3. Connection successfully handling
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
