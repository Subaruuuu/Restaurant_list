const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')

// search
router.get('/', (req, res) => {
  const keyword = req.query.keyword

  let restaurantFilter = []
  Restaurant.find()
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