const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const auth = require('../middleware/auth');

router.get('/', auth, roadmapController.getRoadmap);
router.put('/status', auth, roadmapController.updateTaskStatus);

module.exports = router;
