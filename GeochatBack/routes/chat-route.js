const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/chat-controller");

router.route("/")
    .get(ChatController.getAllChats)
    .post(ChatController.addChat)
    .put(ChatController.editChat)
    .delete(ChatController.deleteChat);

router.post("/my", ChatController.getMyChats)

router.post("/by-id", ChatController.getChatById)
router.delete("/all", ChatController.deleteAllChats)

module.exports = router;