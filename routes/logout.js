const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, UserController.Logout);

module.exports = router;
