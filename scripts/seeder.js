var models = require('../models/schemas');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/demographics');

var genderList = ['male', 'female', 'genderqueer']

genderList.forEach(function(genderName) {
  models.Gender.findOne({
    name: genderName
  }, function(err, gender) {
    if (!gender) {
      models.Gender.create({
        name: genderName,
        count: 0
      }, function(err, created) {
        console.log('err: ', err);
        console.log('created: ', created);
      });
    }
  });
})
