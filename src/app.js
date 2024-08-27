const express = require('express')
const cors = require('cors')
require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
// const socketHandler = require('./sockets/socketHandler')
const routes = require('./routes') // Import the routes

// middleware
const app = express()

// cors
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
// body parser
app.use(express.json())

// socketHandler(app)

// routes
app.get('/', (req, res) => {
  res.json('hi electronics backend')
})

app.use('/api/v1', routes)

// global error handler
app.use(errorHandler)

// not found
app.use(notFound)

module.exports = app
