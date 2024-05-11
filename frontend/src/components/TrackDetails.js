import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TrackDetails() {
  const { id } = useParams();
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/track/${id}`, {
          withCredentials: true,
        });
        setTrack(response.data);
      } catch (error) {
        console.error("Error fetching track details:", error);
      }
    };

    fetchTrack();
  }, [id]);

  if (!track) return <div>Loading...</div>;

  return (
    <div>
      <h1>{track.name}</h1>
      <p>Album: {track.album.name}</p>
      <p>
        Duration: {Math.floor(track.duration_ms / 60000)}:
        {Math.floor((track.duration_ms % 60000) / 1000).toFixed(0)}
      </p>
      <p>Popularity: {track.popularity}/100</p>
      <img
        src={track.album.images[0].url}
        alt={track.album.name}
        style={{ width: "200px" }}
      />
    </div>
  );
}

export default TrackDetails;
