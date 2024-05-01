const express = require('express')
const { engine } = require('express-handlebars')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3333

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const api_routes = require('./routes/api_routes')

const client = require('./db/client')

// Create a GET route for every file in public
app.use(express.static('public'))

// Allow URL Encoded data
app.use(express.urlencoded({ extended: false }))

// Setup handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Setup sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: client,
  }),
  // cookie: { secure: true }
}))

// Load all routes
app.use('/', api_routes)

// Connect database
client.sync({ force:false })
  .then(() => {
    // Start listening / Crank up the server or get it running
    app.listen(PORT, () => console.log('Server listening on port', PORT))
})