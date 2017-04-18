var mongoose = require('mongoose');

var genderSchema = new mongoose.Schema({
  name: { type: String, index: true },
  count: { type: Number, default: 0 }
}, {
  collection: 'Genders'
});

var Gender = mongoose.model('Gender', genderSchema);

module.exports = {
  Gender: Gender
}
