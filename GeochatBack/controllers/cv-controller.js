const CV = require("../models/Cv")
const Freelancer = require("../models/Freelancer")
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {


    const cvs = await CV.find({}).populate("formations");

    if (cvs) {
        res.status(200).send({ cvs, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }

};

exports.getCVById = async (req, res) => {
    if (mongoose.isValidObjectId(req.body._id)) {

        const cv = await CV.findById(req.body._id);
        if (cv) {
            res.status(200).send({ cv, message: "success" });
        } else {
            res.status(403).send({ message: "fail" });
        }
    }
    res.status(403).send({ message: "fail" });
};

exports.getMyCV = async (req, res) => {

    const freelancer = await Freelancer.findById(req.body.liked)

    if (freelancer) {
        const cv = await Like.find({ liked: freelancer }).populate("liker freelancer");;

        if (cv) {
            res.status(200).send({ likes, message: "success" });
        } else {
            res.status(403).send({ message: "fail" });
        }
    } else {
        res.status(404).send({ message: "No data" });
    }
};


exports.getCV = async (req, res) => {

    var cv;
    if (req.body._id) {
        cv = await CV.findById(req.body._id)
        res.status(201).send({ cv, message: "Success" })
    } else {
        //  res.status(400).send({  message: "Cv Id is REquired " })
    }

    res.status(201).send({ cv, message: "Success" })
}


exports.addCV = async (req, res) => {
    const { description, _id } = req.body;

    const newCV = new CV();
    if (req.body._id) {


        newCV.description = description;
        newCV.freelancer = await Freelancer.findById(_id);
        newCV.save();
        res.status(201).send({ message: "success", cv: newCV });

    } else {
        res.status(400).send({ message: "Failed : Freelancer Id Is Required ", cv: newCV });
    }
}

exports.editCV = async (req, res) => {
    const { _id, description } = req.body;

    let cv = await CV.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                description: description,

            }
        }
    );

    res.status(201).send({ like: "success", cv: cv });
};

exports.deleteCV = async (req, res) => {
    const cv = await CV.findById(req.body._id).remove()
    res.status(201).send({ cv: "success", cv: cv });
}

exports.deleteAllCVs = async (req, res) => {
    CV.remove({}, function (err, cv) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ cv: "No data" });
    })
}