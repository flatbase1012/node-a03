exports.index = (req, res) => {
    if (req.query.format === 'json') {
      return res.json({
        name: "Yoshi",
        bio: "Web developer specializing in backend engineering."
      });
    }
    res.render('about', {
      title: "About Me",
      biography: "I am a passionate web developer with expertise in backend technologies and a strong focus on building scalable applications."
    });
  };
  