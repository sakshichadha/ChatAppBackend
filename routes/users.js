const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const { check } = require('express-validator');
const {user_register} = require('../controllers/users');
const User = require('../models/User');



// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('username', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  
   (req, res) => {
    user_register(req, res);
  }
);





module.exports = router;
