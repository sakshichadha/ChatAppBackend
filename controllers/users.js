const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/users');
const Conversation = require('../models/Chat');
const {log_and_send_error} = require('./error');

exports.user_register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    

    user = new User({
      name,
      email,
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
}

exports.getConversations = async (req,res)=>{
      
  try {
 let conversations= await Conversation.find({ recipients: { $elemMatch: { $eq: req.user.id} } })
 console.log(conversations)
 res.status(200).send(conversations);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }

}
exports.newConversation = async (req,res)=>{
    
  const { username } = req.body;
  try {
 let otherUser=  await User.findOne({username:username }).select("-password")

 if(!otherUser){
  res.status(404).send('This user does not exist')
 }
 let oldConvo= await Conversation.findOne({ recipients: [req.user.id,otherUser.id] })
 if(oldConvo){
     res.status(200).send(oldConvo)
 }
 else{
  let newConvo= new Conversation({recipients:[req.user.id,otherUser.id]})
  await newConvo.save();
 res.status(200).send(newConvo);
 }

  } catch (error) {
      
    console.error(error.message);
    res.status(500).send('Server error');
  }

}



