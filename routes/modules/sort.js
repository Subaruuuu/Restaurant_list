const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')

router.get('/', (req, res) => {
  const options = req.query.option
  // console.log(options)

  switch (options) {
    case 'asc':
      Restaurant.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(restaurant => res.render('index', { restaurant: restaurant }))
        .catch(error => console.log(error))
      break
    case 'desc':
      Restaurant.find()
        .lean()
        .sort({ _id: 'desc' })
        .then(restaurant => res.render('index', { restaurant: restaurant }))
        .catch(error => console.log(error))
      break
    case 'category':
      Restaurant.find()
        .lean()
        .sort({ category: 'asc' })
        .then(restaurant => res.render('index', { restaurant: restaurant }))
        .catch(error => console.log(error))
      break
    case 'location':
      Restaurant.find()
        .lean()
        .sort({ location: 'asc' })
        .then(restaurant => res.render('index', { restaurant: restaurant }))
        .catch(error => console.log(error))
      break
    default:
      Restaurant.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(restaurant => res.render('index', { restaurant: restaurant }))
        .catch(error => console.log(error))
  }

})


module.exports = router