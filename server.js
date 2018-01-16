var express = require('express');
var useragent = require('express-useragent');
var app = express();

app.use(useragent.express());

// root, show welcome page / docs
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Build the only API route
app.get("/api/whoami", function (request, response) {
  var ip = request.ip;
  if (request.ips.length > 0) ip = request.ips;
    
  response.json({
    ipaddress: ip,
    language: request.get('accept-language').split(',')[0],
    os: request.useragent.os
  });
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});