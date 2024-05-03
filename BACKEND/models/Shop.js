const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const fs = require('date-fns');
const shopSchema = new Schema({

    storeID : {
        type : String,
        required : true, //checking whether name is null ,if so we cant login
        unique: true, // Set as unique
        index: true, // Add an index for optimization
    },

    image :{
        data: Buffer,
        contentType: String,
    },

    issuedDate : {
        type: String, 
    default: function() {
      // Automatically generate the requestedDate using the current date
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    },

    shopName : {
        type : String,
        required : true //checking whether name is null ,if so we cant login
    },

    ownerName : {
        type : String,
        required : true //checking whether name is null ,if so we cant login
    },

    nic : {
        type : String,
        required : true //checking whether name is null ,if so we cant login
    },
    email : {
        type : String,
        required : true //checking whether name is null ,if so we cant login
    },

    mobile : {
        type : String,
        required : true //checking whether name is null ,if so we cant login
    },

    type :{

        type : String,
       
    },

    lastUpdated :{

        type : String,
       
    }




})
const Shop = mongoose.model("Shop",shopSchema);
module.exports = Shop; 