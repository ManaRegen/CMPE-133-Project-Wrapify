import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        setArtist(response.data);
      } catch (err) {
        setError("Failed to fetch artist details");
        console.error("Error fetching artist details:", err);
      }
    };

    fetchArtist();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!artist) return <div>Loading...</div>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>Genres: {artist.genres.join(", ")}</p>
      <p>Popularity: {artist.popularity}</p>
      <p>Followers: {artist.followers.total}</p>
      <img
        src={artist.images[0]?.url}
        alt={artist.name}
        style={{ width: "200px" }}
      />
    </div>
  );
}

export default ArtistDetails;
