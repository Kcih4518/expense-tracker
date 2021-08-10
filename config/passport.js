// Require node_modules
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = (app) => {
  // Initialize Passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // Set up LocalStrategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash('warning_msg', 'That email is not registered!')
              )
            }
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch)
                return done(
                  null,
                  false,
                  req.flash('warning_msg', 'Password incorrect.')
                )
              return done(null, user)
            })
          })
          .catch((error) => done(error, false))
      }
    )
  )
  // Set serialization and deserialization
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
