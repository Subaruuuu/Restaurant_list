const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const session = require('express-session')
const usePassport = require('./config/passport')
require('./config/mongoose')

app.use(session({
  secret: 'restSecret',
  resave: false,
  saveUninitialized: true
}))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  next()
})

app.use(routes)


// listening port
app.listen(port, (req, res) => {
  console.log(`This express server is running on http://localhost:${port}`)
})