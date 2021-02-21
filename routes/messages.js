const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const eventController= require('../controllers/messages')
// @route    GET api/event
// @desc     GET messages of a conversation
// @access   Private
router.post('/getEvents',auth, eventController.getEvents);
// @route    POST api/event
// @desc     Create a new event
// @access   Private
router.post('/',auth, eventController.newEvent);
module.exports = router;