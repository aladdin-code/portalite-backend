const Like = require("../models/Like")
const User = require("../models/User")

exports.getAllLikes = async (req, res) => {

    res.status(200).send({ like : await Like.find(), message: "success" });

};

exports.getLikeById = async (req, res) => {
    const likes = await Like.findById(req.body._id);

    if (likes) {
        res.status(200).send({ likes, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }
};

exports.getMyLikes = async (req, res) => {

    const user = await User.findById(req.body.liked)

    if (user) {
        const likes = await Like.find({ liked: user }).populate("liker liked");;

        if (likes) {
            res.status(200).send({ likes, message: "success" });
        } else {
            res.status(403).send({ message: "fail" });
        }
    } else {
        res.status(404).send({ message: "No data" });
    }
};


exports.getLike = async (req, res) => {

    var like;
    if (req.body._id) {
        like = await Like.findById(req.body._id)
    } else {
        like = await Like.find()
    }

    res.status(201).send({ like, message: "Success" })
}

exports.addLike = async (req, res) => {
    const { clickDate, seen, liker, liked } = req.body;
    console.log(req.body)

    const newLike = new Like();

    newLike.clickDate = clickDate;
    newLike.seen = seen;

    newLike.liker = await User.findById(liker);
    newLike.liked = await User.findById(liked);

    newLike.save()

    res.status(201).send({ message: "success", like: newLike });
}

exports.editLike = async (req, res) => {
    const { _id, clickDate, seen } = req.body;

    let like = await Like.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                clickDate: clickDate,
                seen: seen,
            }
        }
    );

    res.status(201).send({ like: "success", like: like });
};

exports.deleteLike = async (req, res) => {
    const like = await Like.findById(req.body._id).remove()
    res.status(201).send({ like: "success", like: like });
}

exports.deleteAllLikes = async (req, res) => {
    Like.remove({}, function (err, like) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ like: "No data" });
    })
}