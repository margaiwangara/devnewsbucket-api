const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name:{
    type: String,

  },
  description:{
    type: String
  },
  dateCreated:{
    type: Date,
    default: Date.now
  }
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;