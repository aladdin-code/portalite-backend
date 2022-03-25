const mongoose = require("mongoose");

const FormationSchema = new mongoose.Schema(
        {
                title :{type : String},
                etablissement : {type : String},
                ville : {type : String},
                startDate: {type : Date},
                finDate : {type : Date},
                description: {type : String},
                cv :  { 
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Cv"
                    },

        },
        {
                timestamps: { currentTime: () => Date.now() },
        }
);

module.exports = mongoose.model('Formation', FormationSchema);