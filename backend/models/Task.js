const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    amount: {
      type: Number,
      min: 0,
      default: 0
    },
    currency: {
      type: String,
      trim: true,
      uppercase: true,
      match: /^[A-Z]{3}$/,
      default: 'AUD'
    }
});

module.exports = mongoose.model('Task', taskSchema);