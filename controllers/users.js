const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const {log_and_send_error} = require('./error');

const user_register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    

    user = new User({
      name,
      username,
      password,
      
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    log_and_send_error(err.message, 500, 'Server Error');
  }
};

module.exports = {
  user_register,
  
};
