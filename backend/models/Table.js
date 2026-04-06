const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  table_number: {
    type: Number,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  floor: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Dirty'],
    default: 'Available'
  }
});

module.exports = mongoose.model('Table', tableSchema);
