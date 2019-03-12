const Exercise = require('../models/exercise');
const User = require('../models/user');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const async = require('async');


// POST - add exercise
exports.exercise_post = function(req, res) {
  //validating empty fields
  if (!req.body.uid) return res.status(400).send('Please enter a username');
  if (!req.body.desc) return res.status(400).send('Please enter a description');
  if (!req.body.duration) return res.status(400).send('Please enter the exercise duration in minutes');
  if (!req.body.date) return res.status(400).send('Please enter the date of the event');

  // check if username exists
  User.findOne({ username: req.body.uid }, function (err, data) {
    if (data) {
      //username exists, let's assign their exercises
      let uid = data._id;
      let username = data.username;
      //res.send({'user id': uid, 'username': username});

      // create new exercise 
      let ExerciseByUser = new Exercise ( {
        uid: data._id,
        desc: req.body.desc,
        duration: req.body.duration,
        date: req.body.date
      });

      //save user's log 
      ExerciseByUser.save()
      .then(data => {
        res.send({'user id': data.uid, 'username': username, 'description': data.desc, 'duration': data.duration, 'date': data.date});
        //res.send(data);
      }).catch(err => {
        res.status(500).send({ message: err.message || 'An error ocurred.'});
      });


    } 
    else {
      res.send('Username was not found');
    }
  });
};

// Display exercise log by user
exports.exercise_user = function(req, res) {
 //adding paramenters to our search
 const username = req.params.username;
 let from = req.params.from || null;
 let to = req.params.to || null;
 let limit = req.params.limit || null;
 let userid;

 // validations

 //finding username
 User.findOne({username: username }, function (err, data) {
  if (err) {
     res.send('An error ocurred');
  }
  if (data == null) {
     res.send('User not found!');
  } else {
    userid = data._id;

    // execute query 

        let query = Exercise.find({uid: userid});
        // add conditions


        query.where('date')
        // gte is a mongoBD method which selects the documents where the
        //value is greater or equal too
        .gte(from ? new Date(from) : new Date(0))
        .where('date')
        //lte selects documents where the value is less than or equal too the
        //specified value
        .lte(to ? new Date(to) : new Date())
        .limit(limit)
        .then(doc => {
          if (doc.length) {
            res.send(doc);
          } else {
            res.send('no log available');
          }
        })
        .catch(err => {
        res.send('error');
        });
    }
  }); 
  
     

      
};
