var mongoose = require('mongoose');

var demographicsSchema = new mongoose.Schema({
  category: { type: String, index: true },
  label: String,
  count: Number,
}, {
  collection: 'Demographics'
});

var Demographic = mongoose.model('Demographic', demographicsSchema);

module.exports = {
  Demographic: Demographic
}
