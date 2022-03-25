const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {

        description: { type: String },
        amount: { type: Number },
        date: { type: Number },
        user:  { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model('Payment', PaymentSchema);