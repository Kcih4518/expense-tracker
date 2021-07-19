const express = require('express')
const router = express.Router()

// Read : View all the expenses
router.get('/', (req, res) => {
  res.send('hello from simple server : home)')
})

module.exports = router
