const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const bayleeSchema = new Schema({

    itemId :{
        type : String,
        required : true, //checking whether name is null ,if so we cant login
        unique: true, // Set as unique
        index: true, // Add an index for optimization
    },

    image :{
        data: Buffer,
        contentType: String,
    },


    itemName :{
        type : String,
        required : true,
    },

    itemStock:{
        type : String,
        default : true,
    },

    price:{
        type : String,
        

    },

   
    size :{
        type : String,
        
    },
    color :{
        type : String,
        
    },

    shopName :{
        type : String,
        default:"Baylees"
        
    },

    type :{
        type : String,
       
        
    }






})



const Baylee = mongoose.model("Balyee",bayleeSchema);
module.exports = Baylee; 