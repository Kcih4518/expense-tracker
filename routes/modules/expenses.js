const express = require('express')
const router = express.Router()

// Read: Sort by selection
router.get('/', (req, res) => {
  res.send('hello from simple server : expenses')
})

module.exports = router
