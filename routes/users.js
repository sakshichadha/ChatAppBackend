const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const User = require('../models/users');
const userController= require('../controllers/users');


// @route    POST api/users
// @desc     Register user
// @access   Publi
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  
   (req, res) => {
    userController.user_register(req, res);
  }
);

// @route    POST api/users/conversations
// @desc     Get all conversations of a user
// @access   Private
router.get('/conversations',auth, userController.getConversations)
// @route    POST /api/users/getChatbychatid
// @desc     Get current conversation
// @access   Private
router.post('/conversation',auth, userController.getChatById)



// @route    POST api/users/newconversation
// @desc     Create new conversation with a user
// @access   Private
router.post('/newConversation',auth, userController.newConversation)

router.get('/getChatby')






module.exports = router;
