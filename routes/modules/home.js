const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

module.exports = router