const express = require("express");
const axios = require("axios");
const cors = require("cors");
const session = require("express-session");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL of your frontend
    credentials: true, // This allows cookies and authorization headers
  })
);

app.use(
  session({
    secret: "your_secret_key", // Secret key to sign session ID cookie. Use a real secret in production.
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store.
    cookie: {
      httpOnly: true, // Mitigates the risk of client side script accessing the protected cookie.
      secure: false, // true if you are serving your site over HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
    },
  })
);

// Redirect to Spotify login
app.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email user-top-read playlist-modify-private";
  res.redirect(
    `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }).toString()}`
  );
});

// Logout endpoint
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out");
    }
    res.send("Logged out");
  });
});

// Callback route from Spotify
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: new URLSearchParams({
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    });
    const { access_token } = response.data;
    req.session.accessToken = access_token;
    console.log("Access Token: " + access_token);
    res.redirect(`http://localhost:3000/wrapped`);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/profile", async (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const resp = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${req.session.accessToken}` },
    });
    console.log(resp.data);
    res.json(resp.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch user data");
  }
});

app.get("/top-tracks", async (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const resp = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks/?limit=10",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(resp.data.items);
    res.json(resp.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch user data");
  }
});

app.get("/top-artists", async (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).send("Unauthorized");
  }

  // Fetch artist details
  app.get("/artist/:id", async (req, res) => {
    if (!req.session.accessToken) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${req.params.id}`,
        {
          headers: { Authorization: `Bearer ${req.session.accessToken}` },
        }
      );
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Failed to fetch artist data:", error);
      res.status(500).send("Failed to fetch artist data");
    }
  });

  // Fetch track details
  app.get("/track/:id", async (req, res) => {
    if (!req.session.accessToken) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${req.params.id}`,
        {
          headers: { Authorization: `Bearer ${req.session.accessToken}` },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error("Failed to fetch track data:", error);
      res.status(500).send("Failed to fetch track data");
    }
  });

  try {
    const resp = await axios.get(
      "https://api.spotify.com/v1/me/top/artists/?limit=10",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(resp.data.items);
    res.json(resp.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch user data");
  }
});

app.get("/recommendations", async (req, res) => {
  if (req.session.recommendedTracks) {
    return res.json(req.session.recommendedTracks);
  }

  if (!req.session.accessToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // Fetch user's top tracks
    const topTracksUrl = "https://api.spotify.com/v1/me/top/tracks?limit=5";
    const topTracksResponse = await axios.get(topTracksUrl, {
      headers: {
        Authorization: `Bearer ${req.session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const seedTracks = topTracksResponse.data.items
      .map((item) => item.id)
      .join(",");

    // Fetch recommendations based on top tracks
    const recommendationsUrl = `https://api.spotify.com/v1/recommendations?limit=10&market=US&seed_tracks=${seedTracks}`;
    const recommendationsResponse = await axios.get(recommendationsUrl, {
      headers: {
        Authorization: `Bearer ${req.session.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    recTracks = recommendationsResponse.data.tracks;
    console.log(recTracks);
    req.session.recommendedTracks = recTracks;
    res.json(recTracks); // Send the tracks to the client
  } catch (error) {
    console.error("Failed to fetch data:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).send(error.response.data);
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).send("Failed to fetch user data");
    }
  }
});

app.post('/create-playlist', async (req, res) => {
  const accessToken = req.session.accessToken; // Access token stored in session

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  try {
    // First fetch the user's Spotify ID using the access token
    const meResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const userId = meResponse.data.id;

    // Use the retrieved user ID to create a playlist
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    const data = {
      name: "Wrapify Recommendations", // Customize name and other options as needed
      description: "Created by Wrapify", // Optional description
      public: false // Whether the playlist is public or not
    };

    const createPlaylistResponse = await axios.post(url, data, { headers });
    const playlistId = createPlaylistResponse.data.id;
    const tracks = req.session.recommendedTracks;
    // Assuming 'tracks' is an array containing at least 10 track objects
    const trackURIs = [];
    for (let i = 0; i < 10; i++) {
      trackURIs.push(tracks[i].uri);
    }

    // Convert the array of URIs to a comma-separated string
    let uriString = trackURIs.join(',');

    console.log(uriString);

    const url1 = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(uriString)}`;

    // Set up the headers for your request
    const headers1 = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Make the request to add tracks to the playlist
    axios.post(url1, {}, { headers: headers1 })
      .then(response => {
        console.log('Tracks added:', response.data);
      })
      .catch(error => {
        console.error('Error adding tracks to playlist:', error);
      });

  } catch (error) {
    console.error('Failed to create playlist or add tracks:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to create playlist or add tracks' });
  }
});

app.post('/logout', (req, res) => {
  if (req.session) {
    // Check if accessToken exists in session
    if (req.session.accessToken) {
      // Clear the accessToken
      delete req.session.accessToken;

      // After clearing the accessToken, redirect to the login page
      res.redirect('http://localhost:3000/login');
    } else {
      // If no accessToken was found, still redirect to the login page
      // Optionally, you could send a different response or handle this differently
      res.redirect('http://localhost:3000/login');
    }
  } else {
    // If there is no session initialized, handle accordingly
    // Redirecting to login could still be appropriate
    res.status(400).send("Session not initialized.");
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
