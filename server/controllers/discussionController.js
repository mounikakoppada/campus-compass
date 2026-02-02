const Discussion = require('../models/Discussion');

const discussionController = {
    getDiscussions: async (req, res) => {
        try {
            const discussions = await Discussion.find().populate('author', 'name').sort({ createdAt: -1 });
            res.json(discussions);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },

    createDiscussion: async (req, res) => {
        try {
            const { title, content, category } = req.body;
            const discussion = new Discussion({
                title, content, category, author: req.user.id
            });
            await discussion.save();
            res.json(discussion);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },

    addReply: async (req, res) => {
        try {
            const { discussionId, content } = req.body;
            const discussion = await Discussion.findById(discussionId);
            discussion.replies.push({ content, author: req.user.id });
            await discussion.save();
            res.json(discussion);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = discussionController;
