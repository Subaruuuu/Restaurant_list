const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')  // 引進種子資料所以註銷掉
const mongoose = require('mongoose')          // 引進 mongoose
const Restaurant = require('./models/rest')   // 引進 rest model

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

// router setting
app.get('/', (req, res) => {
  // get all data from "Restaurant"
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// app.get('/', (req, res) => {
//   res.render('index', { restaurant: restaurantList.results })
// })

// check detail
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  res.render('show', { restaurantDetail: restaurant[0] })

  // Restaurant.findById(req.params.restaurant_id)   //從這裡開始繼續修改
  //   .lean()
  //   .then(restaurant => res.render('show', { restaurant: restaurant }))
  //   .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render('index', { restaurant: restaurant, keyword: req.query.keyword })
})

// listening port
app.listen(port, (req, res) => {
  console.log(`This express server is running on http://localhost:${port}`)
})