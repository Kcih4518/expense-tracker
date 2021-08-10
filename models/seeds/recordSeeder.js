// Require node_modules
const Record = require('../records')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const recordsJson = require('./records.json')
const User = require('../users')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

// Setting mongoose
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      })
    )
    .then((user) => {
      const userID = user._id
      recordsJson.forEach((record) => (record.userID = userID))
      return Promise.all(
        Array.from({ length: recordsJson.length }, (_, i) =>
          Record.create(recordsJson[i])
        )
      )
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch((err) => console.log(err))
})
