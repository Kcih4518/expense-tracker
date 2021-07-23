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

// Read: filter by selection
router.get('/filter', async (req, res) => {
  const filterOption = req.query.selectOption
  const categories = await Category.find().lean()
  const filterObject = new Object()
  filterObject['category'] = filterOption
  let totalAmount = 0
  // If option is 類別 need to query all record
  if (!filterOption) {
    delete filterObject.category
  }

  return Record.find(filterObject)
    .lean()
    .sort({ date: 'asc' })
    .then((records) => {
      records.forEach((record) => {
        totalAmount += record.amount
      })
      res.render('index', { records, categories, filterOption, totalAmount })
    })
    .catch((error) => console.log(error))
})

// Update : Display the form for editing expenses record
// TODO: Error handle : When cannot update DB data
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

// Update : Modify expenses record info in DB data
// TODO: Error handle : When cannot update DB data
// TODO: Data verification of req.body
router.put('/:id', (req, res) => {
  const id = req.params.id
  const recordUpdateInfo = req.body
  return Record.findById(id)
    .then((record) => {
      record = Object.assign(record, recordUpdateInfo)
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Delete : Remove expenses record
// TODO: Error handle : When cannot delete DB data
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
