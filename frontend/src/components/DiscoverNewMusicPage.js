import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './DiscoverNewMusicPage.css';


function DiscoverNewMusicPage() {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [message, setMessage] = useState(''); // To display feedback

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksResponse = await axios.get(
          "http://localhost:5000/recommendations",
          { withCredentials: true }
        );

        if (Array.isArray(tracksResponse.data)) {
          setRecommendedTracks(tracksResponse.data);
        } else {
          console.error(
            "Received tracks data is not an array:",
            tracksResponse.data
          );
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle creating a playlist
  const createPlaylist = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/create-playlist", {}, // Assuming no body is required
        { withCredentials: true }
      );
      setMessage('Playlist created successfully!');
    } catch (error) {
      setMessage('Failed to create playlist. Please try again later.');
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <div className="main-container">
      <h1>Recommended Songs</h1>
      <div className="grid-container">
          {recommendedTracks.map((track, index) => (
            <Link
              to={`/track/${track.id}`}
              key={track.id}
              className="grid-item"
            >
              <div className="name">{track.name}</div>
              <div className="name">By {track.artists[0].name}</div>
              <img src={track.album.images[0].url} alt={track.name} />
            </Link>
          ))}
        </div>
      <button onClick={createPlaylist}>Create Playlist</button>
      <p>{message}</p>
    </div>
  );
}

export default DiscoverNewMusicPage;
