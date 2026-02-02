const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Groq = require('groq-sdk');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Access the key from environment config
const groqApiKey = process.env.GROQ_API_KEY;

// Init Groq (Will fail if key is missing, handle gracefully)
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

// Rate Limiting (Simple Firestore implementation)
const checkRateLimit = async (uid) => {
    const docRef = admin.firestore().collection('rateLimits').doc(uid);
    const now = Date.now();
    const window = 60 * 1000; // 1 minute
    const maxOps = 5;

    const doc = await docRef.get();
    let data = doc.exists ? doc.data() : { count: 0, resetTime: now + window };

    if (now > data.resetTime) {
        data = { count: 1, resetTime: now + window };
    } else {
        if (data.count >= maxOps) return false;
        data.count++;
    }

    await docRef.set(data);
    return true;
};

exports.chat = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

        // Check for Auth Token
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) return res.status(401).send('Unauthorized');

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            const uid = decodedToken.uid;

            // Rate Limit
            const allowed = await checkRateLimit(uid);
            if (!allowed) return res.status(429).send({ error: 'Rate limit exceeded' });

            if (!groq) {
                return res.status(500).send({ error: 'Server configuration error (Missing API Key)' });
            }

            const { message, context } = req.body;

            // Get User Name
            const userRecord = await admin.auth().getUser(uid);
            const userName = userRecord.displayName || 'Engineer';

            const systemPrompt = `You are a helpful and encouraging senior engineering mentor for "Campus Compass". 
Your student's name is ${userName}.
Context: They are a first-year engineering student.
Style: Concise, friendly, and practical.
Safety: If asked about cheating, refuse politely.
Current Page Context: ${context || 'General Query'}`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                model: 'llama3-70b-8192',
                max_tokens: 500
            });

            res.send({ reply: completion.choices[0]?.message?.content });

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: error.message });
        }
    });
});
