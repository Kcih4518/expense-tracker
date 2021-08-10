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

  expensesRecord.userID = req.user._id
  console.log(expensesRecord)

  return Record.create(expensesRecord)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Read: filter by categories and months
router.get('/filter', async (req, res) => {
  const userID = req.user._id
  let totalAmount = 0
  const categoryOption = req.query.category
  const monthOption = req.query.month
  const categories = await Category.find().lean()
  const records = await Record.find({ userID }).lean().sort({ date: 'asc' })
  const months = new Set()

  records.forEach((record) => {
    months.add(record.date.substring(0, 7))
  })

  return Record.find({
    $and: [
      {
        category: {
          $regex: categoryOption,
          $options: 'i'
        }
      },
      { date: { $regex: monthOption, $options: 'i' } }
    ],
    userID
  })
    .lean()
    .sort({ date: 'asc' })
    .then((records) => {
      records.forEach((record) => {
        totalAmount += record.amount
      })
      res.render('index', {
        records,
        categories,
        categoryOption,
        monthOption,
        totalAmount,
        months
      })
    })
    .catch((error) => console.log(error))
})

// Update : Display the form for editing expenses record
// TODO: Error handle : When cannot update DB data
router.get('/:id/edit', async (req, res) => {
  const userID = req.user._id
  const categories = await Category.find().lean()
  const _id = req.params.id
  return Record.findOne({ _id, userID })
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
  const userID = req.user._id
  const _id = req.params.id
  const recordUpdateInfo = req.body
  const categories = await Category.find().lean()
  const record = await Record.findById(_id).lean()
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

  return Record.findOne({ _id, userID })
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
  const userID = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userID })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
