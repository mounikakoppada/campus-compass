const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');
const auth = require('../middleware/auth');

router.get('/', discussionController.getDiscussions);
router.post('/', auth, discussionController.createDiscussion);
router.post('/reply', auth, discussionController.addReply);

module.exports = router;
