const express = require("express");
const router = express.Router();
const FreelancerController = require("../controllers/freelancer-controller.js");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const newFileName = (+new Date()).toString() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage });

router.get("/", FreelancerController.getAllFreelancers);


router.post("/signup", FreelancerController.signup);

router.post("/login", FreelancerController.login);
router.post("/setimage",upload.single("image"), FreelancerController.setImage);

router.post("/getfreelancerFromToken", FreelancerController.getFreelancerFromToken);

// router.post("/loginWithSocialApp", UserController.loginWithSocialApp);

router.get("/confirmation/:token", FreelancerController.confirmation);

router.post("/resendConfirmation", FreelancerController.resendConfirmation);

router.post("/forgotPassword", FreelancerController.forgotPassword);

router.put("/editPassword", FreelancerController.editPassword);

router.put("/editProfile", FreelancerController.editProfile);

router.delete("/deleteOne", FreelancerController.deleteOne);

router.delete("/deleteAll", FreelancerController.deleteAll)

module.exports = router;
