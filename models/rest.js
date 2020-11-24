// mongoose Schema model

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restSchema = new Schema({
  // id: {
  //   type: String,
  //   required: true
  // },
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  description: {
    type: String
  },
  rating: {
    type: Number,
    required: true
  },
  google_map: {
    type: String
  }
})

// export Schema constructure
module.exports = mongoose.model('Restaurant', restSchema)