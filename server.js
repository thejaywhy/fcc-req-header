var express = require('express');
var useragent = require('express-useragent');
var app = express();

app.disable('trust proxy');

app.use(useragent.express());

// root, show welcome page / docs
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Build the only API route
app.get("/api/whoami", function (request, response) {

  var data = {
    ipaddress: request.get('X-Forwarded-For') || request.connection.remoteAddress,
    language: request.get('accept-language') || "en-US,en;q=0.9",
    os: request.useragent.os
  }

  response.json(data);
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app; // for testing
