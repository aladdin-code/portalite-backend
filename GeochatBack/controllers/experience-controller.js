const Freelancer = require("../models/Freelancer")
const Experience = require("../models/Experience")
const Cv = require ("../models/Cv")



exports.getAll = async (req, res) => {

    res.status(200).send({ experience: await Experience.find(), message: "success" });

};

exports.getExperienceById = async (req, res) => {
    const experiences = await Experience.findById(req.body._id);

    if (experiences) {
        res.status(200).send({ experiences, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }
};


exports.getExperience = async (req, res) => {

    var experience;
    if (req.body._id) {
        experience = await Experience.findById(req.body._id)
    } else {
        experience = await Experience.find()
    }

    res.status(201).send({ like, message: "Success" })
}

exports.addExperience = async (req, res) => {
    const { title, employeur, ville, startDate, finDate, description , _id} = req.body;
    console.log(req.body)

    const newExp = new Experience();

    newExp.title = title;
    newExp.employeur = employeur;
    newExp.ville = ville;
    newExp.startDate = startDate;
    newExp.finDate = finDate;
    newExp.description = description;
    newExp.cv =  await Cv.findById(_id);
    
    newExp.save();

    Cv.findOneAndUpdate({_id: _id}, {$push: {experiences: newExp}}, function (error, success) {
        if (error) {
            console.log("[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]");

            console.log(error);
            console.log("[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]");
        } else {
            console.log("[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]");
            console.log(success);
        }
    });



    res.status(201).send({ message: "success", experience: newExp });
}

exports.editExperience = async (req, res) => {
    const { _id, title, employeur, ville, startDate, finDate, description } = req.body;

    let experience = await Experience.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                title: title,
                employeur: employeur,
                ville: ville,
                startDate: startDate,
                finDate: finDate,
                description: finDate
            }
        }
    );

    res.status(201).send({ like: "success", experience: experience });
};

exports.deleteExperience = async (req, res) => {
    const experience = await Experience.findById(req.body._id).deleteOne();
    res.status(201).send({ like: "success", experience: experience });
}

exports.deleteAllExperiences = async (req, res) => {
    Experience.deleteMany({}, function (err, experience) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ like: "No data" });
    })
}