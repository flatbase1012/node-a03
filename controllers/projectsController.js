const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// Index
exports.list = async (req, res) => {
  try {
    const projects = await Project.find({});
    if (req.query.format === 'json') {
      return res.json(projects);
    }
    res.render('projects', { title: "Projects", projects });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Search
exports.search = async (req, res) => {
  const query = req.query.query || "";
  const searchTerm = query.toLowerCase().trim();
  try {
    const results = await Project.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { summary: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } }
      ]
    });
    if (req.query.format === 'json') {
      return res.json({ searchTerm: query.trim(), results });
    }
    res.render('search', { title: "Search Projects", searchTerm: query.trim(), results });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Detail
exports.detail = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      if (req.query.format === 'json') {
        return res.status(404).json({ error: "Project not found" });
      }
      return res.status(404).render('404', { title: "404 Not Found" });
    }
    if (req.query.format === 'json') {
      return res.json(project);
    }
    res.render('projectDetail', { title: project.title, project });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Create GET
exports.createForm = (req, res) => {
  res.render('projectForm', { 
    title: "Create Project",
    project: {},
    formAction: "/projects/create",
    submitButtonText: "Create Project"
  });
};

// Create POST
exports.createProject = async (req, res) => {
  try {
    let screenshotPath = "";
    if (req.file) {

      screenshotPath = "/uploads/" + req.file.filename;
    }
    const { title, summary, description, tech } = req.body;

    const techArray = Array.isArray(tech) ? tech : tech.split(',').map(t => t.trim());
    const project = new Project({
      title,
      summary,
      description,
      tech: techArray,
      screenshot: screenshotPath
    });
    await project.save();
    res.redirect('/projects');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Update GET
exports.editForm = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).render('404', { title: "404 Not Found" });
    }
    res.render('projectForm', { 
      title: "Edit Project",
      project,
      formAction: "/projects/" + project._id + "/update",
      submitButtonText: "Update Project"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Update POST
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).render('404', { title: "404 Not Found" });
    }

    if (req.file) {
      if (project.screenshot) {
        const oldPath = path.join(__dirname, '..', 'public', project.screenshot);
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Error deleting old screenshot:", err);
        });
      }
      project.screenshot = "/uploads/" + req.file.filename;
    }

    project.title = req.body.title;
    project.summary = req.body.summary;
    project.description = req.body.description;
    const tech = req.body.tech;
    if (Array.isArray(tech)) {
      project.tech = tech;
    } else {
      project.tech = tech.split(',').map(t => t.trim());
    }
    await project.save();
    res.redirect('/projects/' + project._id);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).render('404', { title: "404 Not Found" });
    }

    if (project.screenshot) {
      const filePath = path.join(__dirname, '..', 'public', project.screenshot);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting screenshot:", err);
      });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/projects');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
