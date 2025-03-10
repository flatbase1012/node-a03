exports.index = (req, res) => {
    if (req.query.format === 'json') {
      return res.json({ message: "Welcome to My Node.js Portfolio!" });
    }
    res.render('index', {
      title: "Welcome to My Node.js Portfolio",
      introduction: "This is a portfolio website showcasing my projects and skills."
    });
  };
  