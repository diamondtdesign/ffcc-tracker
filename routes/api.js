const express = require('express');
const router = express.Router();

// Require controller modules.
const user_controller = require('../controllers/userController');
const exercise_controller = require('../controllers/exerciseController');

// ROUTES //

// api home page
router.get('/', user_controller.index);


//POST request for user
router.post('/exercise/new-user', user_controller.user_post);

// LISTING USERS
router.get('/exercise/users', user_controller.user_list);

//POST request for exercise by user
router.post('/exercise/add', exercise_controller.exercise_post);

// user's log 
router.get('/exercise/log/:username/:from?/:to?/:limit?', exercise_controller.exercise_user);


module.exports = router;
