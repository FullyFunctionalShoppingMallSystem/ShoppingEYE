const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const tshirtSchema = new Schema({



    image :{
        data: Buffer,
        contentType: String,
    },


    email :{
        type : String,
       
    
    },
    date :{
        type : String,
       
    
    },
    description :{
        type : String,
       
    
    },





})



const Tshirt = mongoose.model("Tshirt",tshirtSchema);
module.exports = Tshirt; 