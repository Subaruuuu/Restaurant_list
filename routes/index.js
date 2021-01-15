const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')
// const sort = require('./modules/sort')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')

router.use('/restaurants', authenticator, restaurant)
router.use('/search', authenticator, search)
// router.use('/sort', authenticator, sort)
router.use('/auth', auth)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router