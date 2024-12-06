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




// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express(); // Initialize app first

// const PORT = process.env.PORT || 5000; // Ensure correct port usage

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

// // API endpoint to process emails
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




const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/process-emails', (req, res) => {
    const { emails } = req.body;

    // Validate emails and find duplicates
    const validEmails = emails.filter(email => validateEmail(email));
    const invalidEmails = emails.filter(email => !validateEmail(email));
    const duplicates = findDuplicates(emails);

    // Send back the result
    res.json({
        totalValidEmails: validEmails.length,
        totalInvalidEmails: invalidEmails.length,
        validEmails,
        invalidEmails,
        duplicates
    });
});

// Simple email validation function
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Function to find duplicate emails
function findDuplicates(emails) {
    const seen = new Set();
    return emails.filter(email => seen.size === seen.add(email).size);
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

