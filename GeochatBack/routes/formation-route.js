const express = require("express");
const router = express.Router();
const FormationController = require("../controllers/formation-controller.js");


router.route("/")
    .get(FormationController.getAll)
    .post(FormationController.addFormation)
    .put(FormationController.editFormation)
    .delete(FormationController.deleteFormation);

router.post("/by-id", FormationController.getFormationById)
router.delete("/all", FormationController.deleteAllFormations)
router.post("/del", FormationController.deleteFormation)
// router.post("/my", FormationController.getMyFormations)


module.exports = router;
