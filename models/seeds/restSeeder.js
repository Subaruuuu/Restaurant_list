const db = require('../../config/mongoose')
const Restaurant = require('../rest')
const restaurantSeed = require('../restaurant.json')
const restaurantList = restaurantSeed.results

db.once('open', () => {

  for (let rest of restaurantList) {
    Restaurant.create({
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