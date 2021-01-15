//這個檔案已經被棄用

const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/rest')

router.get('/', (req, res) => {
  const options = req.query.option
  const searchOptions = { _id: 'asc' }

  switch (options) {
    case 'asc': {
      searchOptions = { _id: 'asc' }
      break
    }
    case 'desc': {
      searchOptions = { _id: 'desc' }
      break
    }
    case 'category': {
      searchOptions = { category: 'asc' }
      break
    }
    case 'location': {
      searchOptions = { location: 'asc' }
      break
    }
    default: {
      searchOptions = { _id: 'asc' }
      break
    }
  }
  Restaurant.find()
    .lean()
    .sort(searchOptions)
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))

})


//這個檔案已經被棄用
module.exports = router