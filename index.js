// dependencies set up
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').config();

// database (MongoDB / Mongoose) set up
var mongoose = require('mongoose');
var models = require('./models/schemas');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/demographics');

// Decode POST and PUT data in JSON and URL encoded formats
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// morgan dev linter
app.use(require('morgan')('dev'));

// public directory set up
app.use(express.static(path.join(__dirname + '/public')));

// database API layer
app.use('/api/demographics', require('./controllers/demographics.js'));

// default to requesting root route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var genderDataSeeder = function() {
  var demogList = {
    gender: ['male', 'female', 'other']
  };

  for (var key in demogList) {
    demogList[key].forEach(function(value) {
      var demogSchema = {
        category: key,
        label: value,
        count: 0
      };

      models.Demographic.findOne({
        category: key,
        label: value,
      }, function(err, label) {
        console.log("err: ", err);
        console.log("label: ", label);

        // if label/group does not exist yet
        if (!label) {
          console.log("going to create new label");
          models.Demographic.create({
            category: key,
            label: value,
            count: 0
          });
        } else {
          console.log(key, "already exists");
        }
      });

    });
  }
}

genderDataSeeder();

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
