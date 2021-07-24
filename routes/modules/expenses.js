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
router.post('/', async (req, res) => {
  const categories = await Category.find().lean()
  const expensesRecord = req.body
  const formErrors = []

  if (!expensesRecord.name.trim().length) {
    formErrors.push({ message: '名稱不得輸入空白' })
  }
  if (formErrors.length) {
    return res.render('add', {
      categories,
      expensesRecord,
      formErrors
    })
  }

  return Record.create(expensesRecord)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Read: filter by selection
router.get('/filter', async (req, res) => {
  let totalAmount = 0
  const filterOption = req.query.selectOption
  const categories = await Category.find().lean()
  const filterObject = new Object()

  filterObject.category = filterOption

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
      res.render('edit', { record, categories })
    })
    .catch((error) => console.log(error))
})

// Update : Modify expenses record info in DB data
// TODO: Error handle : When cannot update DB data
// TODO: Data verification of req.body
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const recordUpdateInfo = req.body
  const categories = await Category.find().lean()
  const record = await Record.findById(id).lean()
  const formErrors = []

  if (!recordUpdateInfo.name.trim().length) {
    formErrors.push({ message: '名稱不得輸入空白' })
  }
  if (formErrors.length) {
    return res.render('edit', {
      record,
      categories,
      recordUpdateInfo,
      formErrors
    })
  }

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
