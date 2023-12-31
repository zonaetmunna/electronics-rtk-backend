/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose')
// con { Server } from 'http'
const http = require('http')
const config = require('./config')
const app = require('./app')

let server = http.Server()

// database connect
async function main() {
  try {
    await mongoose.connect(config.database_url)

    console.log('database connected successfully')

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()

// mongoose connect // mongoose
/* mongoose.connect(
  dbUrl,
   (error) => {
  if (error) {
    console.log(`FAILED to connect using mongoose. ${error}`);
  } else {
    console.log(`Connected to DB server. ( ${process.env.NODE_ENV} )`);
  }
  }
) */
process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`)
  process.exit(1)
})
