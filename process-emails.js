const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ['https://your-frontend-url.com'], // Replace with your deployed frontend URL
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));

// Email Validation Logic
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmails(emails) {
    const uniqueEmails = new Set();
    const validEmails = [];
    const invalidEmails = [];
    const duplicates = [];

    emails.forEach(email => {
        if (uniqueEmails.has(email)) {
            if (!duplicates.includes(email)) duplicates.push(email);
        } else if (EMAIL_REGEX.test(email)) {
            validEmails.push(email);
            uniqueEmails.add(email);
        } else {
            invalidEmails.push(email);
        }
    });

    return {
        validEmails,
        invalidEmails,
        duplicates,
        totalValidEmails: validEmails.length,
        totalInvalidEmails: invalidEmails.length,
    };
}

// API Endpoint
app.post('/api/process-emails', (req, res) => {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
        return res.status(400).json({ error: "'emails' must be an array of strings." });
    }

    if (emails.length > 4000) {
        return res.status(400).json({ error: "You can validate up to 4000 emails only." });
    }

    const results = validateEmails(emails);
    res.json(results);
});

// Start Server
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
