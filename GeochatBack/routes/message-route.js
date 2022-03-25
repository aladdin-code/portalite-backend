const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message-controller");

router.route("/")
    .get(MessageController.getAllMessages)
    .post(MessageController.addMessage)
    .delete(MessageController.deleteMessage);

router.post("/by-id", MessageController.getMessageById)
router.delete("/all", MessageController.deleteAllMessages)

module.exports = router;