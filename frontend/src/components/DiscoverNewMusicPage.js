import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Make sure to import Link
// import "./DiscoverNewMusicPage.css"

function DiscoverNewMusicPage() {
  const [recommendedTracks, setRecommendedTracks] = useState([]);

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

  return (
    <div className="main-container">
      <div className="wrapped-container">
        <header className="wrapped-header">
          <h1>Your Recommended Songs</h1>
        </header>
        <section className="recommended-songs">
          <ul>
            {recommendedTracks.map((track) => (
              <li key={track.id}>
                <Link to={`/track/${track.id}`}>{track.name}</Link>{" "}
                {/* Link to track details */}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default DiscoverNewMusicPage;
