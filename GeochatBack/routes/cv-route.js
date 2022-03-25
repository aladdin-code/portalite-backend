const express = require("express");
const router = express.Router();
const CVController = require("../controllers/cv-controller.js");


router.route("/")
    .get(CVController.getAll)
    .post(CVController.addCV)
    .put(CVController.editCV)
    .delete(CVController.deleteCV);

router.post("/by-id", CVController.getCVById)
router.delete("/all", CVController.deleteAllCVs)
router.post("/del", CVController.deleteCV)
router.post("/my", CVController.getMyCV)


module.exports = router;
