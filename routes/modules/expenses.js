const express = require('express')
const router = express.Router()
const Record = require('../../models/records')
const Category = require('../../models/categories')

// Create : Display the form for creating expenses record
router.get('/add', (req, res) => {
  return Category.find()
    .lean()
    .then((categories) => {
      res.render('add', { categories })
    })
    .catch((error) => console.log(error))
})

// Create: Add a new expenses record
// TODO: Error handle : When cannot be established normally
// TODO: Data verification of req.body
router.post('/', (req, res) => {
  const expensesRecord = req.body
  return Record.create(expensesRecord)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Update : Display the form for editing expenses record
router.get('/:id/edit', async (req, res) => {
  const categories = await Category.find().lean()
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      recordDate = record.date.toISOString().slice(0, 10)
      res.render('edit', { record, categories, recordDate })
    })
    .catch((error) => console.log(error))
})

module.exports = router
