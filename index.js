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
app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  var dateobj,unix,utcdate;
  let isUnix = /^\d+$/.test(date);
  if(!date){
    dateobj = new Date();
  }
  else if(date && isUnix){
    unix = parseInt(date);
    dateobj = new Date(unixDate);
  }
  else if (date && !isUnix) {
    dateobj = new Date(date);
  }
  if (dateobj.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }

  unix = dateobj.getTime();
  utc = dateobj.toUTCString();
  res.json({ unix: unix, utc: utc });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
