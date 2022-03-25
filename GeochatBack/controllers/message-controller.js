const Message = require("../models/Message")
const Chat = require("../models/Chat")

exports.getMessageById = async (req, res) => {
    const messages = await Message.findById(req.body._id);

    if (messages) {
        res.status(200).send({ messages, msg: "success" });
    } else {
        res.status(403).send({ msg: "fail" });
    }
};

exports.getAllMessages = async (req, res) => {
    const messages = await Message.find();

    if (messages) {
        res.status(200).send({ messages, msg: "success" });
    } else {
        res.status(403).send({ msg: "fail" });
    }
};


exports.getMessage = async (req, res) => {

    var message;
    if (req.body._id) {
        message = await Message.findById(req.body._id)
    } else {
        message = await Message.find()
    }

    res.status(201).send({ message, msg: "Success" })
}

exports.addMessage = async (req, res) => {
    const { seen, seenDate, sentDate, chat } = req.body;
    console.log(req.body)

    const newMessage = new Message();

    newMessage.seen = seen;
    newMessage.seenDate = seenDate;
    newMessage.sentDate = sentDate;
    newMessage.chat = await Chat.findById(chat)

    newMessage.save()

    res.status(201).send({ msg: "success", message: newMessage });
}

exports.deleteMessage = async (req, res) => {
    const message = await Message.findById(req.body._id).remove()
    res.status(201).send({ msg: "success", message: message });
}

exports.deleteAllMessages = async (req, res) => {
    Message.remove({}, function (err, message) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ msg: "No data" });
    })
}