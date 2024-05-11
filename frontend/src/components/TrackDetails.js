import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TrackDetails.css"; // Ensure this is the correct path

function TrackDetails() {
  const { id } = useParams();
  const [track, setTrack] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/track/${id}`, {
          withCredentials: true,
        });
        if (
          response.data &&
          response.data.album &&
          response.data.album.images[0]
        ) {
          setTrack(response.data);
        } else {
          setError("Album cover is missing.");
        }
      } catch (error) {
        console.error("Error fetching track details:", error);
        setError("Failed to load track details.");
      }
    };

    fetchTrack();
  }, [id]);

  if (error) {
    return <div className="loading">{error}</div>;
  }

  if (!track) {
    return <div className="loading">Loading...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url(${track.album.images[0].url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(10px) brightness(50%)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: -2, // Make sure this layer stays behind all content
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div className="track-container">
        <h1 className="track-title">{track.name}</h1>
        <div className="image-container">
          <img
            src={track.album.images[0].url}
            alt={track.album.name}
            className="track-image"
          />
        </div>
        <div className="track-details">
          <p>Album: {track.album.name}</p>
          <p>
            Duration: {Math.floor(track.duration_ms / 60000)}:
            {((track.duration_ms % 60000) / 1000).toFixed(0)}
          </p>
          <p>Popularity: {track.popularity}/100</p>
        </div>
      </div>
    </>
  );
}

export default TrackDetails;
