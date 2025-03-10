const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  description: { type: String, required: true },
  tech: [String],
  screenshot: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
