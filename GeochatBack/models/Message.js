const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        seen: { type: Boolean },
        seenDate: { type: Date },
        sentDate: { type: Date },

        chat :  { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model('Message', MessageSchema);