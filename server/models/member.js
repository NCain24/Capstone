const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaMembers = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  birthday: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Members', schemaMembers);
