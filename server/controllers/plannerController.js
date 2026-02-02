const User = require('../models/User');

const plannerController = {
    getEvents: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            res.json(user.plannerEvents || []);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },

    addEvent: async (req, res) => {
        try {
            const { title, date, time, type } = req.body;
            const user = await User.findById(req.user.id);
            if (!user.plannerEvents) user.plannerEvents = [];
            user.plannerEvents.push({ title, date, time, type });
            await user.save();
            res.json(user.plannerEvents);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = plannerController;
