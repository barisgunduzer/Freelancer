const User = require('../models/User');
const Project = require('../models/Project');

const fs = require('fs');

exports.createProject = async (req, res) => {
  
  const userID = req.session.userID;

  const user = await User.findById({_id: userID});

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  const title = req.body.title;
  const description = req.body.description;
  const image = '/uploads/' + uploadedImage.name
  const owner = userID;
  
  uploadedImage.mv(uploadPath, async () => {
    try {
      const project = await Project.create({
        title,
        description,
        image,        
        owner     
    });

    await user.projects.push({ _id: project._id });
    await user.save();

    res.status(200).redirect('/admin');
    
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  });
};

exports.updateProject = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      project.title = req.body.title;
      project.description = req.body.description;
      project.save();
  
      res.status(200).redirect('/admin#portfolio');
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };
  
  exports.deleteProject = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      let deletedImage = __dirname + '/../public' + project.image;
      fs.unlinkSync(deletedImage);
      await Project.findByIdAndRemove(req.params.id);
      res.status(200).redirect('/#portfolio');
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };