const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.Login);
router.post('/', UserController.LoginUser);

module.exports = router;
