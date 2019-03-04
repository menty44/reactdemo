// business.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Gender
let Gender = new Schema({
  name: {
    type: String
  }
},{
    collection: 'gender'
});

module.exports = mongoose.model('Gender', Gender);