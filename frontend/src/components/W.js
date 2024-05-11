import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WrappedPage.css"

const WrappedPage = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksResponse = await axios.get(
          "http://localhost:5000/top-tracks",
          { withCredentials: true }
        );
        const artistsResponse = await axios.get(
          "http://localhost:5000/top-artists",
          { withCredentials: true }
        );

        // Check if data is correctly received and is an array
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
    <div>
      <h1>Top Tracks</h1>
      <ol>
        {topTracks.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ol>
      <h1>Top Artists</h1>
      <ol>
        {topArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default WrappedPage;
