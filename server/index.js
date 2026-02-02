const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/roadmap', require('./routes/roadmap.js'));
app.use('/api/planner', require('./routes/planner.js'));
app.use('/api/discussion', require('./routes/discussion.js'));
app.use('/api/chat', require('./routes/chat.js'));

// Main route
app.get('/', (req, res) => {
    res.send('Campus Compass API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
