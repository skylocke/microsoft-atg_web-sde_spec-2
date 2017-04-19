var models = require('../models/schemas');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/demographics');

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
