const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')
const user = require('../../models/user')

// search
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id

  console.log(userId)

  let restaurantFilter = []
  Restaurant.find({ userId })
    .lean()
    .then((restaurant) => {
      restaurantFilter = restaurant.filter((result) => {
        return (result.name.toLowerCase().trim().includes(keyword.toLowerCase().trim())) || (result.category.toLowerCase().trim().includes(keyword.toLowerCase().trim()))
      })
      return res.render('index', { restaurant: restaurantFilter, keyword: keyword })
    })
    .catch(error => console.log(error))
})


module.exports = router