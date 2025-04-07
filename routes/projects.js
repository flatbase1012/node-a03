const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const { ensureAdmin } = require('../middlewares/authMiddleware');

router.get('/', projectsController.list);
router.get('/search', projectsController.search);
router.get('/create', ensureAdmin, projectsController.createForm);
router.post('/create', ensureAdmin, upload.single('screenshot'), projectsController.createProject);
router.get('/:id/edit', ensureAdmin, projectsController.editForm);
router.post('/:id/update', ensureAdmin, upload.single('screenshot'), projectsController.updateProject);
router.post('/:id/delete', ensureAdmin, projectsController.deleteProject);
router.get('/:id', projectsController.detail);

module.exports = router;
