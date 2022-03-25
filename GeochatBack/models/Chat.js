const mongoose = require("mongoose");

// test
const Message = require("./Message")
const MessageSchema = Message.Schema

const ChatSchema = new mongoose.Schema(
    {
        // this is added  for testing
        senderMsgs: [
            
        ],      
         recieverMsgs: [
           
        ], 
        date: { type: Date },
        lastMessage: { type: String },

        sender: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        receiver: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model('Chat', ChatSchema);