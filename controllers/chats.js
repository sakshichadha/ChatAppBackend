const { validationResult } = require('express-validator');
const Chat = require('../models/Chat');
const {log_and_send_error} = require('./error');

const get_chats = async (req,res) => {
    try{
        const chats = await Chat.find();
        res.json(chats);
    } catch(err){
        log_and_send_error(err.message, 500, 'Server Error');
    }
};

const add_chat = async (req,res) => {
    try{
        
    }
}