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
  var datestring = req.params.date;
  if(datestring.includes("-")){
    var datearr = datestring.split("-");
    for(let i=0;i<datearr.length;i++){
      datearr[i] = parseInt(datearr[i]);
    }
    const utc = new Date(datearr[0],datearr[1],datearr[2]).toUTCString();
    const unixTimestamp = Math.floor(new Date(datestring+" 00:00:00.000").getTime()/1000);
    res.json({"unix":unixTimestamp,"utc":utc});
  }
  else{
        var dt = parseInt(datestring);
        if(isNaN(dt)){
          res.json({ error : "Invalid Date" })
          
        }
        else{
          const date = new Date(dt*1000);
          const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getUTCDay()];
          const day = date.getUTCDate();
          const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getUTCMonth()];
          const year = date.getUTCFullYear();
          const hours = date.getUTCHours().toString().padStart(2, '0');
          const minutes = date.getUTCMinutes().toString().padStart(2, '0');
          const seconds = date.getUTCSeconds().toString().padStart(2, '0');

          // Create the desired date string
          const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;

          res.json({date:dt,utc:formattedDate});
        }
  }
});
app.get("/api",function(req,res){
  const date = new Date();
  const unixTimestamp = Math.floor(new Date(date.getFullYear()+date.getMonth()+date.getDate()+" 00:00:00.000").getTime()/1000);
  res.json({"unix":unixTimestamp,"utc":new Date().toUTCString()});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
