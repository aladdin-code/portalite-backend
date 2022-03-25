const Payment = require("../models/Payment")
const User = require("../models/User")

exports.getPaymentById = async (req, res) => {
    const payments = await Payment.findById(req.body._id);

    if (payments) {
        res.status(200).send({ payments, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }
};

exports.getAllPayments = async (req, res) => {
    const payments = await Payment.find();

    if (payments) {
        res.status(200).send({ payments, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }
};


exports.getPayment = async (req, res) => {

    var payment;
    if (req.body._id) {
        payment = await Payment.findById(req.body._id)
    } else {
        payment = await Payment.find()
    }

    res.status(201).send({ payment, message: "Success" })
}

exports.addPayment = async (req, res) => {
    const { description, amount, date, user } = req.body;
    console.log(req.body)

    const newPayment = new Payment();

    newPayment.description = description;
    newPayment.amount = amount;
    newPayment.date = date;
    newPayment.user = await User.findById(user);

    newPayment.save()

    res.status(201).send({ message: "success", payment: newPayment });
}

exports.deletePayment = async (req, res) => {
    const payment = await Payment.findById(req.body._id).remove()
    res.status(201).send({ payment: "success", payment: payment });
}

exports.deleteAllPayments = async (req, res) => {
    Payment.remove({}, function (err, payment) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ payment: "No data" });
    })
}