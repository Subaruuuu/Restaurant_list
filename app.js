const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')  // 引進種子資料所以註銷掉
const mongoose = require('mongoose')          // 引進 mongoose
const Restaurant = require('./models/rest')   // 引進 rest model 建構子
const bodyParser = require('body-parser')

// mongodb setting
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// handlebars setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

// router setting
app.get('/', (req, res) => {
  // res.render('index', { restaurant: restaurantList.results })

  // get all data from "Restaurant"
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// check detail
app.get('/restaurants/:restaurant_id', (req, res) => {
  // const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  // res.render('show', { restaurantDetail: restaurant[0] })

  const id = req.params.restaurant_id
  Restaurant.findById(id)   //從這裡開始繼續修改
    .lean()
    .then(restaurant => res.render('show', { restaurantDetail: restaurant }))
    .catch(error => console.log(error))
})

// create a new restaurant
app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  // console.log(req.body)
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

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurantEdit: restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
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

app.get('/search', (req, res) => {
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


app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// listening port
app.listen(port, (req, res) => {
  console.log(`This express server is running on http://localhost:${port}`)
})