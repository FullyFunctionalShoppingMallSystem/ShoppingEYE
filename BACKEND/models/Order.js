const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a separate schema for the details
const detailSchema = new Schema({
    itemName: String,
    type: String,
    price: String,
    shopName: String,
    itemId: String,
    quantity: String,
    date:String,
    size:String

});

// Use the detailSchema within your main orderSchema
const orderSchema = new Schema({ 
    orderId :{
        type : String,
        unique: true,
        index: true,
    },
    details: [detailSchema], // Using detailSchema as an array
    deliveryFee: {
        type: String,
        default: "350.00"
    },
    Code: String,
    status: {
        type: String,
        default: "pending"
    },
    email: {
        type: String,
        required: true
    },
    total: {
        type: String,
       
    },
    subTotal: {
        type: String,
        
    },
    discount: {
        type: String,
       
    },

    date: {
        type: String,
        default: function() {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
            const day = currentDate.getDate().toString().padStart(2, "0");
            return `${year}-${month}-${day}`;
        }
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
