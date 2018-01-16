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
  
  console.log(request.get('X-Forwarded-For'));
    
  response.json({
    ipaddress: request.get('X-Forwarded-For').split(',')[0],
    language: request.get('accept-language').split(';')[0].split(',')[0],
    os: request.useragent.os
  });
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});