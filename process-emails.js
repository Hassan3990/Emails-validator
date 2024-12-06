// api/process-emails.js
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
        return res.status(400).json({ error: "'emails' must be an array of email strings." });
    }

    if (emails.length > 4000) {
        return res.status(400).json({ error: "Maximum 4000 emails are allowed." });
    }

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

    res.status(200).json({
        validEmails,
        invalidEmails,
        duplicates,
        totalValidEmails: validEmails.length,
        totalInvalidEmails: invalidEmails.length,
    });
}
