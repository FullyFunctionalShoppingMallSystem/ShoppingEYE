const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const storeSchema = new Schema({

    storeID : {
        type : String,
        required : true, //checking whether name is null ,if so we cant login
        unique: true, // Set as unique
        index: true, // Add an index for optimization
    },



    size : {

        type : String,
        required : true, 
    },

    location : {
        type : String,
        required : true, 

    },

    maxHours : {

        type : String,
        default : "10 hours"
    },


    minRentalFee : {
        type : String,
        required : true, 
    }



})
const Store = mongoose.model("Store",storeSchema);
module.exports = Store; 