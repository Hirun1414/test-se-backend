const mongoose = require('mongoose');

const RoomServiceSchema = new mongoose.Schema({
  // If hotel is null/omitted, this service is GLOBAL and applies to all hotels
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hotel',
    default: null,
    index: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  // models/RoomService.js
status: {
  type: String,
  enum: ['available', 'unavailable', 'pending'],  // add pending
  default: 'available',
  index: true
},

minAmount: {
  type: Number,
  default: 1,
  min: [1, 'Minimum amount must be greater than zero']
},

maxAmount: {
  type: Number,
  default: 10
}

}, {
  timestamps: true,
  versionKey: false
});

// prevent duplicate names per hotel (sparse so null hotel fields don't all conflict)
RoomServiceSchema.index({ hotel: 1, name: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('RoomService', RoomServiceSchema);