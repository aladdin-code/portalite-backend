const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment-controller");

router.route("/")
    .get(PaymentController.getAllPayments)
    .post(PaymentController.addPayment)
    .delete(PaymentController.deletePayment);

router.post("/by-id", PaymentController.getPaymentById)
router.delete("/all", PaymentController.deleteAllPayments)

module.exports = router;