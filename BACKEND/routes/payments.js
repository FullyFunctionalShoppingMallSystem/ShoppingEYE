const router = require("express").Router();
let Payment = require("../models/payment");

router.route("/add").post((req, res) => {
    const { name, cardnumber, cvv, expdate } = req.body;

    const newPayment = new Payment({
        name,
        cardnumber,
        cvv,
        expdate
    });

    newPayment.save()
        .then(() => {
            res.json("Payment added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error", message: "Error adding payment" });
        });
});

router.route("/").get((req, res) => {
    Payment.find()
        .then((payments) => {
            res.json(payments);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error", message: "Error getting payments" });
        });
});

router.route("/update/:id").put(async (req, res) => {
    let paymentId = req.params.id;
    const { name, cardnumber, cvv, expdate } = req.body;

    const updatePayment = {
        name,
        cardnumber,
        cvv,
        expdate
    };

    try {
        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updatePayment, { new: true });
        if (!updatedPayment) {
            return res.status(404).send({ status: "Error", message: "Payment not found" });
        }
        res.status(200).send({ status: "Payment updated", payment: updatedPayment });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error", message: "Error updating payment" });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    let paymentId = req.params.id;

    try {
        const deletedPayment = await Payment.findByIdAndDelete(paymentId);
        if (!deletedPayment) {
            return res.status(404).send({ status: "Error", message: "Payment not found" });
        }
        res.status(200).send({ status: "Payment deleted", payment: deletedPayment });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error", message: "Error deleting payment" });
    }
});

router.route("/get/:id").get(async (req, res) => {
    let paymentId = req.params.id;
    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).send({ status: "Error", message: "Payment not found" });
        }
        res.status(200).send({ status: "Payment fetched", payment: payment });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error", message: "Error getting payment" });
    }
});

module.exports = router;
