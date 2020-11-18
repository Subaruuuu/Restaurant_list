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

  return Restaurant.create({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    location: req.body.location,
    phone: req.body.phone,
    rating: req.body.rate,
    description: req.body.description,
    image: req.body.image,
    google_map: req.body.google_map
  }).then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.get('/search', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render('index', { restaurant: restaurant, keyword: req.query.keyword })
})

// listening port
app.listen(port, (req, res) => {
  console.log(`This express server is running on http://localhost:${port}`)
})