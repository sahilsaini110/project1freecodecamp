// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/:date_string", function (req, res) {
  let date_string = req.params.date_string;

  if (parseInt(date_string) > 10000){
      let unixTime = new Date(parseInt(date_string));
      res.json({unix:  unixTime.getTime(), utc:  unixTime.toGMTString() });
  }
  let date = new Date(date_string);
  if(date == "Invalid Date"){
    res.json({"error": "Invalid Date"});
  } else {
    res.json({unix: date.getTime(), utc: date.toGMTString() });
  }
});

app.get("/api", function (req, res) {
  let now = new Date();
    res.json({unix: now.getTime(), utc: now.toGMTString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
