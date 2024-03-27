const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const adsSchema = new Schema({

    shopName :{
        type : String,
       
    
    },

    image :{
        data: Buffer,
        contentType: String,
    },


    description :{
        type : String,
       
    
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





})



const Ads = mongoose.model("Ads",adsSchema);
module.exports = Ads; 