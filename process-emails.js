const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/process-emails', (req, res) => {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({ error: "'emails' must be an array of email strings." });
    }

    const results = emails.map(email => ({
      email,
      isValid: validateEmail(email),
    }));

    res.json(results);
  } catch (error) {
    console.error('Error in /api/process-emails:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});
