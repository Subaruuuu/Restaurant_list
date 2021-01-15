const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')
const user = require('../../models/user')

// search
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id

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

//測試 mongo query 語法
// router.get('/', (req, res) => {
//   const keyword = req.query.keyword
//   const userId = req.user._id

//   const query = {
//     $or: [
//       { name: { $regex: keyword, $options: 'i' }, userId },
//       { category: { $regex: keyword, $options: 'i' }, userId }
//     ]
//   }

//   let restaurantFilter = []
//   Restaurant.find({ query })
//     .lean()
//     .sort({ _id: 'asc' })
//     .then((restaurant) => {
//       console.log(restaurant)
//       return res.render('index', { restaurant: restaurantFilter, keyword: keyword })
//     })
//     .catch(error => console.log(error))
// })


module.exports = router