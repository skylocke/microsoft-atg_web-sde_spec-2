var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/schemas');

// API root: /api/demographics/

router.route('/')
  .get(function(req, res) {
    models.Demographic.find({}, function(err, results) {
      console.log('err: ', err, !!err);
      console.log('results: ', results);
      if (!err) {
        res.send(results);
      }
    });
  });

router.route('/:category')
  .get(function(req, res) {
    models.Demographic.findOne({
      category: req.params.category
    }, function(err, results) {
      console.log('err: ', err, !!err);
      console.log('results: ', results);
      if (!err) {
        res.send(results);
      }
    });
  })
  .put(function(req, res) {
    console.log(req.body);
    // models.Demographic.findOne({
    //   category: req.params.category
    // }, function(err, demographic) {
    //   console.log('err: ', err, !!err);
    //   console.log('demographic: ', demographic);
    //   if (err) {
    //     return res.status(500).send(err);
    //   } else {
    //     var tempTypes = demographic.types;
    //     tempTypes[req.body.type]++;
    //     demographic.types = tempTypes;
    //     console.log(demographic)
    //     demographic.save();
    //   }
    // });

    var incrementFieldString = "types." + req.body.type;
    var incrementObj = {};
    incrementObj[incrementFieldString] = 1;
    models.Demographic.findOneAndUpdate(
      { category: req.params.category },
      { $inc: incrementObj },
      { upsert: true, new: true },
      function(err, data) {
        console.log('err: ', err);
        console.log('data: ', data);
      }
    )
  });

module.exports = router;
