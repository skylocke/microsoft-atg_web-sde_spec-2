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

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
