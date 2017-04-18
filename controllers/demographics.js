var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/schemas');

// API root: /api/demographics/

router.route('/')
  .get(function(req, res) {
    models.Gender.find({}, function(err, genders) {
      console.log('err: ', err);
      if (!err) {
        res.send(genders);
      }
    })
  })
  .put(function(req, res) {

  });

module.exports = router;
