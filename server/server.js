require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // you can restrict to your GH Pages domain later

const CLIENT_ID = process.env.FORGE_CLIENT_ID;
const CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET;

// Two-legged token endpoint
app.get('/api/forge/oauth/token', async (req, res) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=data:read`
    });
    res.json({
      access_token: response.data.access_token,
      expires_in:   response.data.expires_in
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Forge token server listening on port ${PORT}`));
