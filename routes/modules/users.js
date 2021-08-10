// Require node_modules
const express = require('express')
const router = express.Router()
const User = require('../../models/users')

// Read : Display login page
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router
