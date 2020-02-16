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
  mobileThumbnail: {
    type: String,
  },
  mobileGif: {
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
})

module.exports = mongoose.model('Project', ProjectSchema, 'Projects')