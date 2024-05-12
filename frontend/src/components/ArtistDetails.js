import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ArtistDetails.css"; // Ensure this is the correct path

function ArtistDetails() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/artist/${id}`, {
          withCredentials: true,
        });
        if (
          response.data &&
          response.data.images[0]
        ) {
          setArtist(response.data);
        } else {
          setError("Album cover is missing.");
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
      <div style={backgroundStyle}></div>
      <div className="artist-container">
        <h1 className="artist-title">{artist.name}</h1>
        <div className="image-container">
          <img
            src={artist.images[0].url}
            alt={artist.name}
            className="artist-image"
          />
        </div>
        <div className="artist-details">
          <p>Album: {artist.name}</p>
          <p>Popularity: {artist.popularity}/100</p>
        </div>
      </div>
    </>
  );
}

export default ArtistDetails;
