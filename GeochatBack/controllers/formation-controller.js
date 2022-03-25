const Freelancer = require("../models/Freelancer")
const Formation = require("../models/Formation")
const Cv = require ("../models/Cv")



exports.getAll = async (req, res) => {

    res.status(200).send({ formation: await Formation.find(), message: "success" });

};

exports.getFormationById = async (req, res) => {
    const formation = await Formation.findById(req.body._id);

    if (formation) {
        res.status(200).send({ formation, message: "success" });
    } else {
        res.status(200).send({ formation, message: "barsha succeess" });
        //res.status(403).send({ message: "fail" });
    }
};

exports.getFormation = async (req, res) => {

    var formation;
    if (req.body._id) {
        formation = await Formation.findById(req.body._id)
    } else {
        formation = await Formation.find()
    }

    res.status(201).send({ formation, message: "Success" })
}



exports.addFormation = async (req, res) => {
    // here we should update the cv 
    // i forgot it
    const { title, etablissement, ville, startDate, finDate, description , _id} = req.body;
    console.log(req.body)

    const newForm = new Formation();

    if (req.body._id) {
        newForm.title = title;
        newForm.etablissement = etablissement;
        newForm.ville = ville;
        newForm.startDate = startDate;
        newForm.finDate = finDate;
        newForm.description = description;
        newForm.cv =  await Cv.findById(_id);

        newForm.save();
        Cv.findOneAndUpdate({_id: _id}, {$push: {formations: newForm}}, function (error, success) {
            if (error) {
                console.log("[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]");

                console.log(error);
                console.log("[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]");
            } else {
                console.log("[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]");
                console.log(success);
            }
        });

      
       console.log( newForm.cv);

       console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    
        res.status(201).send({ message: "success", formation: newForm });
    }
    else {
        res.status(400).send({ message: "Failed : CV  Id Is Required ", form: newForm });     
    }
}

exports.editFormation = async (req, res) => {
    const { _id, title, etablissement, ville, startDate, finDate, description } = req.body;

    let formation = await Formation.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                title: title,
                etablissement: etablissement,
                ville: ville,
                startDate: startDate,
                finDate: finDate,
                description: description
            }
        }
    );

    res.status(201).send({ like: "success", formation: formation });
};

exports.deleteFormation = async (req, res) => {
    const formation = await Formation.findById(req.body._id).remove()
// remove ref in cv


    res.status(201).send({ formation: "success", formation: formation });
}

exports.deleteAllFormations = async (req, res) => {
    Formation.deleteMany({}, function (err, experiance) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ like: "No data" });
    })
}