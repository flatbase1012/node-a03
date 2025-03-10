const Project = require('../models/Project');

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
