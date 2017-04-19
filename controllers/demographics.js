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
    models.Demographic.find({
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

    models.Demographic.findOneAndUpdate(
      { category: req.params.category, label: req.body.label },
      { $inc: { count: 1 } },
      { upsert: true, new: true },
      function(err, results) {
        console.log('err: ', err);
        console.log('results: ', results);
        res.send(results);
      }
    )
  });

module.exports = router;
