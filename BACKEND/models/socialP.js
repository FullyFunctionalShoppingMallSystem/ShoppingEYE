const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  imageUrl: String
  
});

module.exports = mongoose.model('Social', socialSchema);