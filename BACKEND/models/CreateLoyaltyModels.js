const mongoose = require('mongoose')


const CreateLoyaltySchema = new mongoose.Schema({
    fullName: String,
    nic: String,
    email:String,
    phone:String
})


module.exports = mongoose.model("createloyalty",CreateLoyaltySchema);