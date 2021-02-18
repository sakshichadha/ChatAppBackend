const { Schema } = require("mongoose");

const ChatSchema = new Schema({
    users: [{type: Schema.Types.ObjectId,
            ref:'Users'
            }],

    messages: [{type: Schema.Types.ObjectId,
        ref:'Messages'
        }]


});

module.exports = mongoose.model('chat', ChatSchema);