const { Schema, model } = require('mongoose');

const solutionSchema = new Schema({
  condition: {
    type: String,
    enum: ['depression', 'anxiety', 'ptsd', 'schizophrenia', 'addiction'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['coping-strategy', 'professional-help', 'lifestyle', 'emergency', 'resource'],
    required: true,
  },
  summary: {
    type: String,
  },
  steps: [String],
  resources: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Solution', solutionSchema);
