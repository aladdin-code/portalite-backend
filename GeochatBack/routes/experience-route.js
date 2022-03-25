const express = require("express");
const router = express.Router();
const ExperienceController = require("../controllers/experience-controller.js");
router.route("/")
    .get(ExperienceController.getAll)
    .post(ExperienceController.addExperience)
    .put(ExperienceController.editExperience)
    .delete(ExperienceController.deleteExperience);

router.post("/by-id", ExperienceController.getExperienceById);
router.delete("/all", ExperienceController.deleteAllExperiences);
router.post("/del", ExperienceController.deleteExperience);
//router.post("/my", ExperienceController.getMyExperiences);
module.exports = router;
