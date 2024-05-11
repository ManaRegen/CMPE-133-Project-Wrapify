import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./WrappedPage.css";

function WrappedPage() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksResponse = await axios.get(
          "http://localhost:5001/top-tracks",
          { withCredentials: true }
        );
        const artistsResponse = await axios.get(
          "http://localhost:5001/top-artists",
          { withCredentials: true }
        );

        if (Array.isArray(tracksResponse.data)) {
          setTopTracks(tracksResponse.data);
        } else {
          console.error(
            "Received tracks data is not an array:",
            tracksResponse.data
          );
        }

        if (Array.isArray(artistsResponse.data)) {
          setTopArtists(artistsResponse.data);
        } else {
          console.error(
            "Received artists data is not an array:",
            artistsResponse.data
          );
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container">
      <div className="wrapped-container">
        <header className="wrapped-header">
          <h1>YOUR CURRENT WRAPPED</h1>
        </header>
        <section className="wrapped-stats">
          <h2>Your Top Songs</h2>
          <ul>
            {topTracks.map((track) => (
              <li key={track.id}>
                <Link to={`/track/${track.id}`}>{track.name}</Link>
                {/* Make each track name a clickable link */}
              </li>
            ))}
          </ul>
        </section>
        <section className="wrapped-stats">
          <h2>Your Top Artists</h2>
          <ul>
            {topArtists.map((artist) => (
              <li key={artist.id}>
                <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                {/* Make each artist name a clickable link */}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="artist-images">
        {/* Ensure images are relevant or handle image gallery here */}
      </div>
    </div>
  );
}

export default WrappedPage;
