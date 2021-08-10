// Require node_modules
const Categories = require('../categories')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const categoriesJson = require('./categories.json')

// Setting mongoose
db.once('open', () => {
  Categories.create(categoriesJson)
    .then(() => {
      console.log('Import category data into database successfully!')
      return db.close()
    })
    .catch((error) => {
      console.log(error)
    })
})
