export default function handler(req, res) {
    if (req.method === 'POST') {
        const { emails } = req.body;

        if (!emails || !Array.isArray(emails)) {
            return res.status(400).json({ error: 'Invalid input. Please provide an array of emails.' });
        }

        // Email validation logic
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmails = [];
        const invalidEmails = [];
        const duplicates = new Set();

        emails.forEach((email) => {
            if (!emailRegex.test(email)) {
                invalidEmails.push(email);
            } else if (validEmails.includes(email)) {
                duplicates.add(email);
            } else {
                validEmails.push(email);
            }
        });

        // Response
        return res.status(200).json({
            totalValidEmails: validEmails.length,
            totalInvalidEmails: invalidEmails.length,
            validEmails,
            invalidEmails,
            duplicates: Array.from(duplicates),
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(Method ${req.method} Not Allowed);
    }
}
