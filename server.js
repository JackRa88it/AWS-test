var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');

var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var databaseURL = 'zoo';
var collections = ['animals'];

var db = mongojs(databaseURL, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

// ROUTES
// ==========================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.get('/addTiger', function(req, res) {
  db.animals.insert({
    name: "tiger",
    weight: 500
  },
  function(err, inserted) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(inserted);
      res.send('tiger added!')
    }
  });
})

app.get('/all', function(req, res) {
  db.animals.find({}, function(error, found) {
    if(error) {
      console.log(error);
    } else {
      res.json(found);
    };
  });
});


// server listen
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});