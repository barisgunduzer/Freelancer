const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ProjectSchema = new Schema({
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
  });
  
  const Project = mongoose.model('Project', ProjectSchema);
  
  module.exports = Project;
  