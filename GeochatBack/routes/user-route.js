const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller.js");

router.get("/", UserController.getAllUsers);
// added for testing 

// modidfing the positin 

router.put("/setPosition", UserController.setPosition);
// end

router.post("/signup", UserController.signup);

router.post("/login", UserController.login)

router.post("/getUserFromToken", UserController.getUserFromToken)

router.post("/loginWithSocialApp", UserController.loginWithSocialApp);

router.get("/confirmation/:token", UserController.confirmation);

router.post("/resendConfirmation", UserController.resendConfirmation);

router.post("/forgotPassword", UserController.forgotPassword);

router.put("/editPassword", UserController.editPassword);

router.put("/editProfile", UserController.editProfile);

router.delete("/deleteOne", UserController.deleteOne);

router.delete("/deleteAll", UserController.deleteAll)

module.exports = router;
