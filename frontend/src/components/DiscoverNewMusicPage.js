import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DiscoverNewMusicPage() {
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/recommendations",
          {
            withCredentials: true,
          }
        );
        if (Array.isArray(response.data)) {
          setRecommendedTracks(response.data);
        } else {
          console.error("Received data is not an array:", response.data);
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
                <Link to={`/track/${track.id}`}>{track.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default DiscoverNewMusicPage;
