// Require node_modules
const express = require('express')
const expressHandlebars = require('express-handlebars')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
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

// Setting body-parser
app.use(express.urlencoded({ extended: true }))

// Setting middleware: method-override
app.use(methodOverride('_method'))

// Setting Express router and import request into router
app.use(routes)

// Start and listen on the express server
app.listen(PORT, () => {
  console.log(`Express is listen on http://localhost:${PORT}`)
})
