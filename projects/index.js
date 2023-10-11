const express = require('express');
const Projects = require('../models/Project');
const protected = require('../util/protected');

const router = express.Router();

router.get('/', async (req, res) => {
  // Get all projects
  try {
    const projects = await Projects.find();

    return res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err,
      message:
        err.message || 'Failed to retrieve projects due to an unknown error'
    });
  }
});

router.post('/', protected, async (req, res) => {
  // Post a new project
  try {

    const projects = await Projects.find();

    const orders = projects.map(p => p.order);

    const data = {
      ...req.body,
      order: Math.max(...orders) + 100
    }

    const newProject = new Projects(data);

    await newProject.save();

    return res.status(201).json(newProject);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err,
      message:
        err.message ||
        'An uknown error occurred while trying to post that project'
    });
  }
});

router.put('/:id', protected, async (req, res) => {
  // Edit a project
  try {

    const { id } = req.params;

    const project = await Projects.findById(id);

    const updatedProject = await project.updateOne(req.body);

    return res.status(200).json(updatedProject);

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err,
      message:
        err.message ||
        'An uknown error occurred while trying to update that project'
    });
  }
});

router.delete('/:id', protected, async (req, res) => {
  // Delete a project
  try {
    const { id } = req.params;

    const project = await Projects.findById(id);

    await project.remove();

    return res.status(200).json({message: 'Project deleted successfully'});

  } catch (err) {
    return res.status(500).json({
      err,
      message:
        err.message ||
        'An uknown error occurred while trying to delete that project'
    });
  }
});

module.exports = router;
