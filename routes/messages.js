const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {eventController,getEvents,newEvent}= require('../controllers/messages')


// @route    GET api/event
// @desc     GET messages of a conversation
// @access   Private
router.get('/',auth, getEvents);

// @route    POST api/event
// @desc     Create a new event
// @access   Private
router.post('/',auth, newEvent);


module.exports = router;