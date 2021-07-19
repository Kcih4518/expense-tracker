// Require node_modules
const express = require('express')
const exphdbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

// Define server info
const PORT = process.env.PORT || 3000

//Setting express
const app = express()

// Setting express-handlebars
app.engine('hbs', exphdbs({ defaultLayout: 'main', extname: '.hbs' }))
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
