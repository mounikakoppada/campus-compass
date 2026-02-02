const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    universityId: { type: String },
    profile: {
        academicBackground: String,
        learningPreferences: [String],
        personalGoals: [String],
    },
    roadmap: [{
        task: String,
        status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
        resources: [String]
    }],
    plannerEvents: [{
        title: String,
        date: String,
        time: String,
        type: { type: String, enum: ['assignment', 'exam', 'session'], default: 'session' }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
