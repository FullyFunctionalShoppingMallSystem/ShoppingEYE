const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    name: {
        type :String,
        required: true,
    },

    cardnumber: {
        type :String,
        required: true,
    },

    cvv: {
        type :String,
        required: true,
    },

    expdate: {
        type: Date,
        required : true
    },

})

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;