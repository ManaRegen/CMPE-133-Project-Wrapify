import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./WrappedPage.css";

function WrappedPage() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksResponse = await axios.get(
          "http://localhost:5001/top-tracks?limit=20", // Adjust limit to 20
          { withCredentials: true }
        );
        const artistsResponse = await axios.get(
          "http://localhost:5001/top-artists?limit=20", // Adjust limit to 20
          { withCredentials: true }
        );

        setTopTracks(tracksResponse.data);
        setTopArtists(artistsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container">
      <div className="section songs-container">
        <h2>Your Top Songs</h2>
        <div className="grid-container">
          {topTracks.map((track, index) => (
            <Link
              to={`/track/${track.id}`}
              key={track.id}
              className="grid-item"
            >
              <div className="rank">{index + 1}</div>
              <div className="name">{track.name}</div>
              <img src={track.album.images[0].url} alt={track.name} />
            </Link>
          ))}
        </div>
      </div>
      <div className="section artists-container">
        <h2>Your Top Artists</h2>
        <div className="grid-container">
          {topArtists.map((artist, index) => (
            <Link
              to={`/artist/${artist.id}`}
              key={artist.id}
              className="grid-item"
            >
              <div className="rank">{index + 1}</div>
              <div className="name">{artist.name}</div>
              <img src={artist.images[0].url} alt={artist.name} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WrappedPage;
