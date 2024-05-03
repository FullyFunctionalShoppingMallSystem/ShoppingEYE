const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    code :{
        type : String,
        unique: true,
       
    },
    description :{
        type : String,
       
    },
    date :{
        type : String,
    
    },
    expDate :{
        type : String,
    
    },
    discount :{
        type : String,
    
    },
});

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;