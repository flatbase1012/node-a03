const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

// binding routes to controller functions
router.get('/', projectsController.list);

router.get('/search', projectsController.search);

router.get('/create', projectsController.createForm);

router.post('/create', upload.single('screenshot'), projectsController.createProject);

router.get('/:id', projectsController.detail);

router.get('/:id/edit', projectsController.editForm);

router.post('/:id/update', upload.single('screenshot'), projectsController.updateProject);

router.post('/:id/delete', projectsController.deleteProject);

module.exports = router;
