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

//{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
// your first API endpoint... 
app.get("/api/:id", function (req, res) {
  app.get("/api/", (req, res) => {
    return res.json({"unix": Date.now(), "utc": new Date()})
  });
  //{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
  //Your project can handle dates that can be successfully parsed by new Date(date_string)
  var id = req.params.id
  if (/\s/g.test(id)){
    id =  new Date(id).getTime() || id
  }
  if (id.length === 13){
    id = parseInt(id)
  }
  if (id.length === 10){
    id =  new Date(id).getTime() || id
  }
  if (new Date(id).toUTCString() === "Invalid Date"){
    return res.json({ error : "Invalid Date" })
  }

  res.json({
    "unix": id,
    'utc': new Date(id).toUTCString()
  })
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
