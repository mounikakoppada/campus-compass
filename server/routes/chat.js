const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const auth = require('../middleware/auth');
const User = require('../models/User');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// In-memory rate limiting: { userId: { count: number, resetTime: timestamp } }
const rateLimit = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

router.post('/', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const { message, context } = req.body;

        // 1. Rate Limiting Check
        const now = Date.now();
        if (!rateLimit[userId] || rateLimit[userId].resetTime < now) {
            rateLimit[userId] = { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
        }

        if (rateLimit[userId].count >= MAX_REQUESTS) {
            return res.status(429).json({ message: 'Rate limit exceeded. Please wait a moment.' });
        }

        rateLimit[userId].count++;

        // 2. Fetch User for personalization
        const user = await User.findById(userId).select('name');

        // 3. Construct Prompt
        const systemPrompt = `You are a helpful and encouraging senior engineering mentor for "Campus Compass". 
Your student's name is ${user ? user.name : 'Future Engineer'}.
Context: They are a first-year engineering student.
Style: Concise, friendly, and practical. Avoid long theoretical lectures.
Safety: If asked about cheating or harmful acts, politely refuse and guide them to ethical alternatives.
Current Page Context: ${context || 'General Query'}`;

        // 4. Call Groq API
        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            model: 'llama3-70b-8192', // Efficient and smart
            temperature: 0.7,
            max_tokens: 500, // Strict token limit for cost control
        });

        const reply = completion.choices[0]?.message?.content || "I'm thinking, but I couldn't come up with an answer right now.";

        res.json({ reply });

    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ message: 'Failed to process your request.' });
    }
});

module.exports = router;
