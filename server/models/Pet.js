const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Dog', 'Cat', 'Other'],
  },
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  photos: [{
    data: Buffer,
    contentType: String 
  }],
  healthInfo: {
    type: String,
    required: true,
  },
  compatibility: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pet', PetSchema);
