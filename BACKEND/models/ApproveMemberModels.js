const mongoose = require('mongoose')

const ApproveMembershipSchema = new mongoose.Schema({
    fullName : String,
    nic : String,
    email : String,
    phone : String
})

module.exports = mongoose.model("approvemembership",ApproveMembershipSchema);