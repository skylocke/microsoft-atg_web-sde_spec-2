var models = require('../models/schemas');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/demographics');

var demogList = {
  gender: ['male', 'female', 'other']
};

for (var key in demogList) {
  var typeList = {};
  demogList[key].forEach(function(value) {
    typeList[value] = 0;
  });

  models.Demographic.findOne({
    category: key
  }, function(err, category) {
    console.log("err: ", err);
    console.log("category: ", category);

    // if the category does not exist yet
    if (!category) {
      console.log("going to create new category");
      models.Demographic.create({
        category: key,
        types: typeList
      });
    } else {
      console.log(key, "already exists");
    }
  });
}
