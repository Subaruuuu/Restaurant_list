const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')

router.get('/', (req, res) => {
  const options = req.query.option
  let searchOptions = { _id: 'asc' }

  const userId = req.user._id

  switch (options) {
    case 'asc': {
      searchOptions = { _id: 'asc' }
      break
    }
    case 'desc': {
      searchOptions = { _id: 'desc' }
      break
    }
    case 'category': {
      searchOptions = { category: 'asc' }
      break
    }
    case 'location': {
      searchOptions = { location: 'asc' }
      break
    }
    default: {
      searchOptions = { _id: 'asc' }
      break
    }
  }

  Restaurant.find({ userId })
    .lean()
    .sort(searchOptions)
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

module.exports = router