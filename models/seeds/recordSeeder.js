// Require node_modules
const Record = require('../records')
const db = require('../../config/mongoose')
const recordsJson = require('./records.json')

// Setting mongoose
db.once('open', () => {
  Record.create(recordsJson)
    .then(() => {
      db.close()
      console.log('Import record data into database successfully!')
    })
    .catch((error) => {
      console.log(error)
    })
})
