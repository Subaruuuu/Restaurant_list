const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')

// create a new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const data = req.body
  const message = '此為必填欄位'
  if (data.name == '' || data.name_en == '' || data.category == '' || data.image == '' || data.rating == '') {
    res.render('new', { message })
  } else {
    // req.body物件的屬性與Restaurant的 chema一樣，所以可直接當作參數塞進去，不需要一個個asign
    return Restaurant.create(req.body)
      .then()
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
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
  const message = '此為必填欄位'

  if (data.name == '' || data.name_en == '' || data.category == '' || data.image == '' || data.rating == '') {
    Restaurant.findById(id)
      .lean()
      .then(restaurant => res.render('edit', { restaurantEdit: restaurant, message: message }))
      .catch(error => console.log(error))
  } else {
    // 跟new情況一樣，這邊用Object.assign來指派給restaurant
    return Restaurant.findById(id)
      .then(restaurant => {
        restaurant = Object.assign(restaurant, req.body)
        return restaurant.save()
      })
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(error => console.log(error))
  }

})


router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router