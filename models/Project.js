const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
  demo: {
    type: String,
    required: false
  },
  thumbnail: {
    type: String,
    required: true,
  },
  gif: {
    type: String,
  },
  mobile_thumbnail: {
    type: String,
  },
  mobile_gif: {
    type: String,
  }, 
  description: {
    type: String,
    required: true
  },
  tech: {
    type: String,
    required: true
  },
  early: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Project', ProjectSchema, 'Projects')