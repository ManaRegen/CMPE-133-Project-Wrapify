import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ArtistDetails.css"; // Assuming this CSS is identical to TrackDetails.css for consistency

function ArtistDetails() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/artist/${id}`, {
          withCredentials: true,
        });
        if (response.data && response.data.images && response.data.images[0]) {
          setArtist(response.data);
        } else {
          setError("Artist image data is missing."); // Similar error handling as TrackDetails
        }
      } catch (error) {
        console.error("Error fetching artist details:", error);
        setError("Failed to load artist details.");
      }
    };

    fetchArtist();
  }, [id]);

  if (error) {
    return <div className="loading">{error}</div>;
  }

  if (!artist) {
    return <div className="loading">Loading...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url(${artist.images[0].url})`,
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
      <div style={backgroundStyle}></div>{" "}
      {/* Background, same as TrackDetails */}
      <div className="track-container">
        {" "}
        {/* Using track-container for styling consistency */}
        <h1 className="track-title">{artist.name}</h1>
        <div className="image-container">
          <img
            src={artist.images[0].url}
            alt={artist.name}
            className="track-image" // Using track-image for styling consistency
          />
        </div>
        <div className="track-details">
          {" "}
          {/* Using track-details for styling consistency */}
          <p>Genres: {artist.genres.join(", ")}</p>
          <p>Popularity: {artist.popularity}/100</p>
          <p>Followers: {artist.followers.total}</p>
        </div>
      </div>
    </>
  );
}

export default ArtistDetails;
