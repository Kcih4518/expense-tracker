// Require node_modules
const express = require('express')
const expressHandlebars = require('express-handlebars')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const session = require('express-session')
const flash = require('connect-flash')
require('./config/mongoose')
const handlebarsHelpers = require('handlebars-helpers')(['comparison'])

// Define server info
const PORT = process.env.PORT

// Setting express
const app = express()

// Setting express-handlebars
app.engine(
  'hbs',
  expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: handlebarsHelpers
  })
)
app.set('view engine', 'hbs')

// Setting express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

// Setting body-parser
app.use(express.urlencoded({ extended: true }))

// Setting middleware: method-override
app.use(methodOverride('_method'))

// Setting connect-flash
app.use(flash())

// Setting middleware to store info into res.locals
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// Setting Express router and import request into router
app.use(routes)

// Start and listen on the express server
app.listen(PORT, () => {
  console.log(`Express is listen on http://localhost:${PORT}`)
})
