const User = require('../models/User');

const roadmapController = {
    getRoadmap: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user.roadmap || user.roadmap.length === 0) {
                // Generate a default roadmap for first-year engineering
                const defaultRoadmap = [
                    { task: 'Bridge knowledge gaps in Calculus', status: 'todo', resources: ['Khan Academy - Calculus', 'University Library - Mathematics for Engineers'] },
                    { task: 'Learn Basics of Programming (Python/C)', status: 'todo', resources: ['Coursera - Python for Everybody', 'MIT OpenCourseWare'] },
                    { task: 'Understand Engineering Ethics', status: 'todo', resources: ['IEEE Ethics Handbook'] },
                    { task: 'Set up your Study Workspace', status: 'todo', resources: ['Article: Ergonomic Study Setup'] }
                ];
                user.roadmap = defaultRoadmap;
                await user.save();
            }
            res.json(user.roadmap);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },

    updateTaskStatus: async (req, res) => {
        try {
            const { taskId, status } = req.body;
            const user = await User.findById(req.user.id);
            const taskIndex = user.roadmap.findIndex(t => t._id.toString() === taskId);
            if (taskIndex !== -1) {
                user.roadmap[taskIndex].status = status;
                await user.save();
            }
            res.json(user.roadmap);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = roadmapController;
