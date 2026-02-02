const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');
const auth = require('../middleware/auth');

router.get('/', auth, plannerController.getEvents);
router.post('/', auth, plannerController.addEvent);

module.exports = router;
