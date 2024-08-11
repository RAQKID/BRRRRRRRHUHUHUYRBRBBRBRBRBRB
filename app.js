const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  const apiEndpoint = 'https://raqkidapiendpoint.onrender.com/chat/yi_large';
  const apiKey = 'RaqkidKey_9C2eH5gY'; // Replace with your actual API key

  try {
    const response = await axios.get(apiEndpoint, {
      params: {
        prompt: question,
        key: apiKey
      }
    });

    const data = response.data;

    if (data.status === "true" && data.result.length > 0) {
      res.json({ answer: data.result[0].response });
    } else {
      res.json({ answer: 'No answer received' });
    }
  } catch (error) {
    res.status(500).send('Error contacting the AI service');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});