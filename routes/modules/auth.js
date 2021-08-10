const express = require('express')
const router = express.Router()
const passport = require('passport')

// Read : Request user information from Facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  })
)

// Read : Return user information from Facebook
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

module.exports = router
