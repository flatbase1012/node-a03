const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

router.get('/', projectsController.list);
router.get('/search', projectsController.search);
router.get('/:id', projectsController.detail);

module.exports = router;
