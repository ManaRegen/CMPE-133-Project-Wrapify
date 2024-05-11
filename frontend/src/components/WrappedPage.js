import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WrappedPage.css"

function WrappedPage() {
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
    <div className="main-container"> {/* Full-page container */}
      <div className="wrapped-container"> {/* Existing content container */}
        <header className="wrapped-header">
          <h1>YOUR CURRENT WRAPPED</h1>
        </header>
        <section className="wrapped-stats">
          <h2>Your Top Songs</h2>
          <ul>
            {topTracks.map((track) => (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul>
        </section>

        <section className="wrapped-stats">
          <h2>Your Top Artists</h2>
          <ul>
            {topArtists.map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </ul>
        </section>
      </div>
      <div className="metrics-container"> {/* New metrics container */}

        <h2>Top Artists</h2>
        <div className='artist-images'>
          <SimpleCarousel>
            <li><img src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" alt="Artist 1" /></li>
            <li><img src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" /></li>
            <li><img src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" /></li>
            <li><img src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" /></li>
            <li><img src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" /></li>
          </SimpleCarousel>
        </div>
      </div>
    </div>
  );
}

export default WrappedPage;