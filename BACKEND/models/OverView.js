const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const overViewSchema = new Schema({
    orderId :{
        type : String,
       
    },
    description :{
        type : String,
       
    },
    date :{
        type : String,
    
    },
});

const OverView = mongoose.model("OverView", overViewSchema);
module.exports = OverView;