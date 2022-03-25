const mongoose = require("mongoose");

const FreelancerSchema = new mongoose.Schema(
        {          
                email: { type: String },
                password: { type: String },
                firstname: { type: String },
                lastname: { type: String },
                age: { type: Number },
                sexe: { type: String },
                isVerified: { type: Boolean },
                profession: {type :  String},
                image: {type : String},
                admin: {type : Boolean},
                cv: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Cv"
                    },
        },
        {
                timestamps: { currentTime: () => Date.now() },
        }
);

module.exports = mongoose.model('Freelancer', FreelancerSchema);