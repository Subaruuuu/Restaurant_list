const mongoose = require('mongoose')
const Restaurant = require('../rest')
const restaurantSeed = require('../restaurant.json')
const restaurantList = restaurantSeed.results

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for (let rest of restaurantList) {
    Restaurant.create({
      id: rest.id,
      name: rest.name,
      name_en: rest.name_en,
      category: rest.category,
      image: rest.image,
      location: rest.location,
      phone: rest.phone,
      description: rest.description,
      rating: rest.rating,
      google_map: rest.google_map
    })
  }

  console.log('done.')

})