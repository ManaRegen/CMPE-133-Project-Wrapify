import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DiscoverNewMusicPage.css"

function WrappedPage() {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [recommendedArtists, setRecommendedArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksResponse = await axios.get(
          "http://localhost:5001/recommendations",
          { withCredentials: true }
        );
        
        // Check if data is correctly received and is an array
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

  return (
    <div className="main-container">
        <div className="wrapped-container"> {/* Existing content container */}
        <header className="wrapped-header">
          <h1>Your Recommended Songs</h1>
        </header>
        <section className="recommended-songs">
          <ul>
            {recommendedTracks.map((track) => (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default DiscoverNewMusicPage;