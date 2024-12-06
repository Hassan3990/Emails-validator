const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Regular expression for email validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Function to validate emails
function validateEmails(emails) {
    const uniqueEmails = new Set();
    const validEmails = [];
    const invalidEmails = [];
    const duplicates = [];

    emails.forEach((email) => {
        if (uniqueEmails.has(email)) {
            if (!duplicates.includes(email)) {
                duplicates.push(email);
            }
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

// API endpoint to process emails
app.post('/api/process-emails', (req, res) => {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
        return res.status(400).json({ error: "'emails' must be an array of email strings." });
    }

    if (emails.length > 4000) {
        return res.status(400).json({ error: "Maximum 4000 emails are allowed." });
    }

    const results = validateEmails(emails);
    res.json(results);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

