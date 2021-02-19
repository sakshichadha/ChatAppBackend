const { validationResult } = require('express-validator');
const User = require('../models/Message');
const {log_and_send_error} = require('./error');
const Event = require('../models/Message');

const Event=require('../../models/Event')

// This 
exports.getEvents = async (req,res)=>{

    const { chatRoomId,timestamp } = req.body;
    try {
        if(!timestamp)
        {
        let events=  await Event.aggregate([
            {
                $match:{
                 chatRoomId:chatRoomId
            }},
            
             {$sort: {date: 1}} ,
                {
                  $group:
                    {
                        _id:"$messageId",
                      sender:{$last: "$sender"},
                      text:{$last: "$text"},
                      type:{$last:"$type"},
                      time:{$last:"$date"}
                    }
                }     
      ])
       
           res.status(200).send(events)
        }
        else{
            let events=  await Event.aggregate([

                {
                    $match:{
                    date: { $gt: new Date(timestamp) },
                     chatRoomId:chatRoomId
                }},
                
                 {$sort: {date: 1}} ,
                    {
                      $group:
                        {
                            _id:"$messageId",
                          sender:{$last: "$sender"},
                          text:{$last: "$text"},
                          type:{$last:"$type"},
                          time:{$last:"$date"}
                        }
                    }
                  
          ])
           
               res.status(200).send(events)
        }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }

  }


  exports.newEvent = async (req,res)=>{
      
    const { chatRoomId,type,messageId,text } = req.body;
    try {

    let event=  new Event({ sender:req.user.id, type,messageId, text, chatRoomId })
        await event.save()
       res.status(200).send(event)
   
    } catch (error) {
        
      console.error(error.message);
      res.status(500).send('Server error');
    }

  }