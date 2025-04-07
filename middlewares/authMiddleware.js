function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login?errorMessage=You must be logged in to view this page.');
  }
  
  function ensureAdmin(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect('/login?errorMessage=You must be logged in as Admin to view this page.');
    }
    if (req.user.roles && req.user.roles.includes('Admin')) {
      return next();
    }
    res.status(403).send("Access Denied");
  }
  
  module.exports = { ensureAuthenticated, ensureAdmin };
  