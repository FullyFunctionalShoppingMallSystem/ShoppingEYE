const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({ 

    itemId :{
        type : String,
        required : true,
        

    
    },

    itemName :{
        type : String,
        required : true, 
       
    
    },

    shopName:{
        type : String,
        required : true, 
       
    
    },

   type:{
        type : String,
        required : true, 
       
    
    },

    image :{
        data: Buffer,
        contentType: String,
    },


    date :{
        type : String,
        default: function() {
            // Automatically generate the requestedDate using the current date
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
            const day = currentDate.getDate().toString().padStart(2, "0");
            return `${year}-${month}-${day}`;
          }
    
    },

    price:{
        type : String,
       

    },

    quantity:{
        type : String,
        default : "1",

    },

    size:{
        type : String,
       

    },




})



const Cart = mongoose.model("Cart",cartSchema);
module.exports = Cart; 