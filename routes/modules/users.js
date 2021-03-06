// Require node_modules
const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const bcrypt = require('bcryptjs')
const passport = require('passport')

// Read : Display login page
router.get('/login', (req, res) => {
  res.render('login')
})

// CREATE : Verify request login status
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

// Read : Display register page
router.get('/register', (req, res) => {
  res.render('register')
})

// Create : Register a new user
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const formErrors = []

  if (!name || !email || !password || !confirmPassword) {
    formErrors.push({ message: 'All fields are required' })
  }

  if (password !== confirmPassword) {
    formErrors.push({
      message: 'The password does not match the confirmed password!'
    })
  }

  if (formErrors.length) {
    return res.render('register', {
      formErrors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: 'This Email has already been registered.' })
      return res.render('register', {
        formErrors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash
        })
      )
      .then(() => res.redirect('/'))
      .catch((error) => console.log(error))
  })
})

// Read : User logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logged out.')
  res.redirect('/users/login')
})

module.exports = router
