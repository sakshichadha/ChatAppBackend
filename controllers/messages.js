const { validationResult } = require('express-validator');
const User = require('../models/Message');
const {log_and_send_error} = require('./error');

const get_all_messages = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
   
        return res.status(400).json({ errors: errors.array() });
    }

    const {}
}