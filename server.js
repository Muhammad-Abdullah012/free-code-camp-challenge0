// server.js
// where your node app starts

// init project
const express = require('express');
const helmet = require('helmet');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');


app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(helmet());
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", (req,res) => {
  let d = new Date();
  res.json({"unix": d.getTime(), "utc": d.toUTCString() });
});

app.get("/api/:date", (req,res,next) => {
  let pattern = /\D/g;
  let result = null;
  result = req.params.date.match(pattern);
  if(result === null) {
    req.params.time = req.params.date;
    req.params.date = null;
  }
  next()
} ,(req, res) => {
  let d;
  if(req.params.date !== null) {
    d = new Date(req.params.date);
  }
  else {
    d = new Date();
    d.setTime(req.params.time);
  }
  if(! d.getTime()) {
    res.json({error: "Invalid Date"});
  }
  res.json({"unix": d.getTime(), "utc": d.toUTCString() });
});


// listen for requests :)
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is ready ');
});
