const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Instagram credentials and redirect URI
const clientId = process.env.INSTAGRAM_APP_ID;
const clientSecret = process.env.INSTAGRAM_APP_SECRET;
const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

// Instagram OAuth2 URLs
const instagramTokenUrl = 'https://api.instagram.com/oauth/access_token';

// Step 1: Redirect to Instagram's OAuth2 Authorization URL
app.get('/login', (req, res) => {
  const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
  res.redirect(instagramAuthUrl);
});

// Step 2: Handle the OAuth2 callback and exchange the code for an access token
app.get('/instagram-login-callback', async (req, res) => {
  const code = req.query.code;
  
  if (!code) {
    return res.status(400).send('Authorization code is missing.');
  }

  try {
    // Exchange the authorization code for an access token
    const response = await axios.post(instagramTokenUrl, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code
      }
    });

    const { access_token, user_id } = response.data;

    // Send the access token to the client
    res.send(`Access Token: ${access_token}`);

    // Optionally, use the access token to fetch user profile data
    const userProfile = await axios.get(`https://graph.instagram.com/me?fields=id,username,profile_picture_url&access_token=${access_token}`);
    console.log(userProfile.data); // Log user profile data

  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    res.status(500).send('Failed to exchange code for access token');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
