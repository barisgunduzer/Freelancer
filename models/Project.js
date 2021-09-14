const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ProjectSchema = new Schema({
    title: String,
    description: String,
    image: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Project = mongoose.model('Project', ProjectSchema);
  
  module.exports = Project;
  