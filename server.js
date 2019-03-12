const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv		= require('dotenv');
require('dotenv').config();
// port number
const port = 3000;
//setting host
const host = "https://localhost/";
//dotenv.config(config.database);
const dbUrl = process.env.MONGOLAB;

//Require models from routes
var indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

// set static folder
app.use(express.static('public'));

// to parse application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Connect to database
mongoose.connect(process.env.MONGOLAB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${dbUrl}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

//Routes

//Index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/', indexRouter);
// API
app.use('/api', apiRouter);


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});

module.exports = app;
