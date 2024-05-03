const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  
});

module.exports = mongoose.model('Person', personSchema);
