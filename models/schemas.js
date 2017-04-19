var mongoose = require('mongoose');

var demographicsSchema = new mongoose.Schema({
  name: { type: String, index: true },
  types: {}
}, {
  collection: 'Demographics'
});

var Demographic = mongoose.model('Demographic', demographicsSchema);

module.exports = {
  Demographic: Demographic
}
