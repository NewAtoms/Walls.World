var express = require('express')

var Server = function () {
  var self = this

  if (process.env.PORT) {
    this.hostUrl = 'http://interface.newatoms.com'
  } else {
    this.hostUrl = 'http://localhost:8080'
  }

  this.start = function () {
    // Import the Express server module and create an Express app
    var app = express()

    // Start the server
    var server = app.listen(
      process.env.PORT || 8081,
      function () {
        // Find out what address and port the server is running on
        var host = server
            .address()
            .address || self.hostUrl
        var port = server
          .address()
          .port

        self.registerRoutes(app)

        // Tell the command line user the server is running
        console.log('Server listening at http://' + host + port)
      }
    )
  }

  this.registerRoutes = function (app) {
    // Serve nice static content from the Bower Components
    app.use('/bower_components', express.static('./bower_components'))
    app.use('/elements', express.static('./web/elements'))

    app.get('/robots.txt', function (request, response) {
      response.sendFile('robots.txt', {
        root: './web'
      })
    })
    app.get('/favicon.ico', function (request, response) {
      response.sendFile('favicon.ico', {
        root: './web'
      })
    })
    app.get('/403', function (request, response) {
      response.sendFile('403.html', {
        root: './web'
      })
    })
    app.get('/404', function (request, response) {
      response.sendFile('404.html', {
        root: './web'
      })
    })

    // Serve the web app on the root route
    app.get('*', function (request, response) {
      response.sendFile('main.html', {
        root: './web'
      })
    })
  }
}

module.exports = Server
