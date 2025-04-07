const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, contactController.getForm);
router.post('/', ensureAuthenticated, contactController.submitForm);

module.exports = router;
