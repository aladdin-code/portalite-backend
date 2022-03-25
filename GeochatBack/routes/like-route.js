const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/like-controller");

router.route("/")
    .get(LikeController.getAllLikes)
    .post(LikeController.addLike)
    .put(LikeController.editLike)
    .delete(LikeController.deleteLike);

router.post("/by-id", LikeController.getLikeById)
router.delete("/all", LikeController.deleteAllLikes)
router.post("/del", LikeController.deleteLike)
router.post("/my", LikeController.getMyLikes)

module.exports = router;