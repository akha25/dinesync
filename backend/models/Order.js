const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  table_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Settled'],
    default: 'Active'
  },
  subtotal: {
    type: Number,
    default: 0
  },
  total_tax: {
    type: Number,
    default: 0
  },
  service_charge: {
    type: Number,
    default: 0
  },
  grand_total: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
