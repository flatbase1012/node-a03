const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getForm);
router.post('/', contactController.submitForm);

module.exports = router;
