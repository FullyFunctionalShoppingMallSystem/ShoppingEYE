const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    content: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        //required: true,
        min: 1,
        max: 5,
    },


    userId: {
        type: String,
        ref: 'User', // Reference to the User model if you have user accounts
        required: true,
    },

    itemId: {
        type: String,
        ref: 'Item', // Reference to the Item model
        required: true,
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



const Review = mongoose.model("Review",reviewSchema);
module.exports = Review; 