const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')

// create a new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const data = req.body

  return Restaurant.create({
    name: data.name,
    name_en: data.name_en,
    category: data.category,
    location: data.location,
    phone: data.phone,
    rating: data.rating,
    description: data.description,
    image: data.image,
    google_map: data.google_map
  }).then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// detail
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurantDetail: restaurant }))
    .catch(error => console.log(error))
})

// edit
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurantEdit: restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const data = req.body

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = data.name
      restaurant.name_en = data.name_en
      restaurant.category = data.category
      restaurant.location = data.location
      restaurant.phone = data.phone
      restaurant.rating = data.rating
      restaurant.description = data.description
      restaurant.image = data.image
      restaurant.google_map = data.google_map
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})


router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// router.get('/search', (req, res) => {
//   const keyword = req.query.keyword

//   let restaurantFilter = []
//   Restaurant.find()
//     .lean()
//     .then((restaurant) => {
//       restaurantFilter = restaurant.filter((result) => {
//         return (result.name.toLowerCase().trim().includes(keyword.toLowerCase().trim())) || (result.category.toLowerCase().trim().includes(keyword.toLowerCase().trim()))
//       })
//       return res.render('index', { restaurant: restaurantFilter, keyword: keyword })
//     })
//     .catch(error => console.log(error))
// })


module.exports = router