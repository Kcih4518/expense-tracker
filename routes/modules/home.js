const express = require('express')
const router = express.Router()
const Record = require('../../models/records')
const Category = require('../../models/categories')

// Read : View all the expenses
router.get('/', async (req, res) => {
  let totalAmount = 0
  const categories = await Category.find().lean()
  const months = new Set()
  return Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then((records) => {
      records.forEach((record) => {
        totalAmount += record.amount
        months.add(record.date.substring(0, 7))
      })

      res.render('index', {
        records,
        categories,
        months,
        totalAmount
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
