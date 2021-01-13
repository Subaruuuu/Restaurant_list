if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Restaurant = require('../rest')
const User = require('../user')

const restaurantSeed = require('../restaurant.json')
const rest = restaurantSeed.results

const bcrypt = require('bcryptjs')

const SEED_USER1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

const SEED_USER2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from({ length: 3 }, (_, i) => {
        return Restaurant.create({
          name: rest[i].name,
          name_en: rest[i].name_en,
          category: rest[i].category,
          image: rest[i].image,
          location: rest[i].location,
          phone: rest[i].phone,
          description: rest[i].description,
          rating: rest[i].rating,
          google_map: rest[i].google_map,
          userId
        })
      }))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})


db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER2.password, salt))
    .then(hash => User.create({
      name: SEED_USER2.name,
      email: SEED_USER2.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from({ length: 3 }, (_, i) => {
        return Restaurant.create({
          name: rest[i + 3].name,
          name_en: rest[i + 3].name_en,
          category: rest[i + 3].category,
          image: rest[i + 3].image,
          location: rest[i + 3].location,
          phone: rest[i + 3].phone,
          description: rest[i + 3].description,
          rating: rest[i + 3].rating,
          google_map: rest[i + 3].google_map,
          userId
        })
      }))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })

})