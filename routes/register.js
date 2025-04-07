const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.Register);
router.post('/', UserController.RegisterUser);

module.exports = router;
