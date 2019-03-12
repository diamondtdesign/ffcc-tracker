const User = require('../models/user');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const async = require('async');

//api home page
exports.index = function(req, res) {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display user list
exports.user_list = function(req, res, next) {
  User.find()
  .sort([['username', 'ascending']])
  .exec()
  .then(data => res.status(200).json(data));
  
};

// GET user
exports.user_get = function(req, res, next) {
  res.send('get user');
  
};


// POST - create new user 
exports.user_post = function(req, res, next) {
  //validating if field is empty
  if (!req.body.username) return res.status(400).send('Please enter a username');

  // check if username already exists
  User.findOne({username: req.body.username }, function (err, data) {
    if (data) {
      res.send('Username already exists');
    }
    else {
      // create new user
      let newUser = new User ( { username: req.body.username } );

      //save username
      newUser.save()
      .then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({ message: err.message || 'An error ocurred.'});
      });

    }
  });

};

