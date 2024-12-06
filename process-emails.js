// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express(); // Initialize app first

// const PORT = 5000;

// // Middleware
// app.use(cors()); // Allow cross-origin requests
// app.use(bodyParser.json()); // Parse JSON request bodies

// // Regular expression for email validation
// const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// // Function to validate emails
// function validateEmails(emails) {
//     const uniqueEmails = new Set();
//     const validEmails = [];
//     const invalidEmails = [];
//     const duplicates = [];

//     emails.forEach((email) => {
//         if (uniqueEmails.has(email)) {
//             if (!duplicates.includes(email)) {
//                 duplicates.push(email);
//             }
//         } else if (EMAIL_REGEX.test(email)) {
//             validEmails.push(email);
//             uniqueEmails.add(email);
//         } else {
//             invalidEmails.push(email);
//         }
//     });

//     return {
//         validEmails,
//         invalidEmails,
//         duplicates,
//         totalValidEmails: validEmails.length,
//         totalInvalidEmails: invalidEmails.length,
//     };
// }

// // API endpoint
// app.post('/api/process-emails', (req, res) => {
//     const { emails } = req.body;

//     if (!emails || !Array.isArray(emails)) {
//         return res.status(400).json({ error: "'emails' must be an array of email strings." });
//     }

//     if (emails.length > 4000) {
//         return res.status(400).json({ error: "Maximum 4000 emails are allowed." });
//     }

//     const results = validateEmails(emails);
//     res.json(results);
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




// api/process-emails.js
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

// Serverless function handler
export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
        return res.status(400).json({ error: "'emails' must be an array of email strings." });
    }

    if (emails.length > 4000) {
        return res.status(400).json({ error: "Maximum 4000 emails are allowed." });
    }

    const results = validateEmails(emails);
    res.status(200).json(results);
}
