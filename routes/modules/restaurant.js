const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')

// create a new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  // console.log(req.body)
  const { name, name_en, category, image, location, phone, description, rating, google_map } = req.body
  const userId = req.user._id

  // req.body物件的屬性與Restaurant的 chema一樣，所以可直接當作參數塞進去，不需要一個個asign
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    description,
    rating,
    google_map,
    userId
  })
    .then()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

// detail
router.get('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurantDetail: restaurant }))
    .catch(error => console.log(error))
})

// edit
router.get('/:restaurant_id/edit', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurantEdit: restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const data = req.body
  const userId = req.user._id

  // 跟new情況一樣，這邊用Object.assign來指派給restaurant
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router