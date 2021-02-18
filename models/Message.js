const { Schema } = require("mongoose");

const MessageSchema = new Schema({
    body: {
        type: String, 
        required: true,
    },
    media: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now(),
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },


});

module.exports = mongoose.model('message', MessageSchema);