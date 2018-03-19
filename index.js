'use strict'

const next = require('next')
const express = require('express');
const expressApp = express();

// Load environment variables from .env file if present
require('dotenv').load()

// now-logs allows remote debugging if deploying to now.sh
if (process.env.LOGS_SECRET) {
  require('now-logs')(process.env.LOGS_SECRET)
}

process.on('uncaughtException', function (err) {
  console.error('Uncaught Exception: ', err)
})

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason)
})

// Default when run with `npm start` is 'production' and default port is '80'
// `npm run dev` defaults mode to 'development' & port to '8080'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PORT = process.env.PORT || 80

// Initialize Next.js
const nextApp = next({
  dir: '.',
  dev: (process.env.NODE_ENV === 'development')
})


// Initiate NextApp
// Start server
nextApp
  .prepare()
  .then(() => {
    expressApp.use('/fonts/ionicons', express.static('./node_modules/ionicons/dist/fonts'))

    // A simple example of custom routing
    // Send requests for '/custom-route/{anything}' to 'pages/examples/routing.js'
    expressApp.get('/custom-route/:id', (req, res) => {
      return nextApp.render(req, res, '/examples/routing', req.params)
    })

    // Default catch-all handler to allow Next.js to handle all other routes
    expressApp.all('*', (req, res) => {
      let nextRequestHandler = nextApp.getRequestHandler()
      return nextRequestHandler(req, res)
    })

    expressApp.listen(process.env.PORT, err => {
      if (err) {
        throw err
      }
      console.log('> Ready on http://localhost:' + process.env.PORT + ' [' + process.env.NODE_ENV + ']')
    })
  })