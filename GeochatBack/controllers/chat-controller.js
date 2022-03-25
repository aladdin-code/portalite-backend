const Chat = require("../models/Chat")
const User = require("../models/User")

exports.getChatById = async (req, res) => {
    const chats = await Chat.findById(req.body._id);

    if (chats) {
        res.status(200).send({ chats, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }
};

exports.getAllChats = async (req, res) => {
    const chats = await Chat.find().populate({ path: "receiver sender" });

    if (chats) {
        res.status(200).send({ chats, message: "success" })
    } else {
        res.status(403).send({ message: "fail" });
    }
};

exports.getMyChats = async (req, res) => {

    const user = await User.findById(req.body.sender)

    if (user) {
        const chats = await Chat.find({ sender: user }).populate({ path: "receiver sender" });

        if (chats) {
            res.status(200).send({ chats, message: "success" });
        } else {
            res.status(403).send({ message: "fail" });
        }
    } else {
        res.status(404).send({ message: "No data" });
    }
};


exports.getChat = async (req, res) => {

    var chat;
    if (req.body._id) {
        chat = await Chat.findById(req.body._id)
    } else {
        chat = await Chat.find()
    }

    res.status(201).send({ chat, message: "Success" })
}

// adding new chat with msgs
exports.addChat = async (req, res) => {
    const { date, lastMessage, sender, receiver , receiverMsgs , senderMsgs } = req.body;
    console.log(req.body)

    const newChat = new Chat();

    // adding new att
    newChat.senderMsgs = senderMsgs;
    newChat.receiverMsgs = receiverMsgs; 
    
    newChat.date = date;
    newChat.lastMessage = lastMessage;

    newChat.sender = await User.findById(sender);
    newChat.receiver = await User.findById(receiver);

    newChat.save()

    res.status(201).send({ message: "success", chat: newChat });
}

exports.editChat = async (req, res) => {
    const { _id, date, lastMessage , senderMsgs , receiverMsgs } = req.body;

    let chat = await Chat.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                senderMsgs: senderMsgs,
                receiverMsgs :receiverMsgs,
                date: date,
                lastMessage: lastMessage
            }
        }
    );

    res.status(201).send({ chat: "success", chat: chat });
};

exports.deleteChat = async (req, res) => {
    const chat = await Chat.findById(req.body._id).remove()
    res.status(201).send({ chat: "success", chat: chat });
}

exports.deleteAllChats = async (req, res) => {
    Chat.remove({}, function (err, chat) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ chat: "No data" });
    })
}