
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({ error: "'emails' must be an array of email strings." });
    }

    const results = emails.map(email => ({
      email,
      isValid: validateEmail(email),
    }));

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error in process-emails:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
