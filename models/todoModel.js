const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['0', '1'],
    default: '0'
  }
});

module.exports = mongoose.model('todo', todoSchema);
