import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function GenrePage() {
  const { genreId } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/genre/${genreId}/songs`)
      .then((response) => setSongs(response.data))
      .catch((error) => console.error("Error fetching songs", error));
  }, [genreId]);

  return (
    <div>
      <h1>Songs</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <Link to={`/song/${song.id}`}>{song.title}</Link> by{" "}
            <Link to={`/artist/${song.artistId}`}>{song.artist}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenrePage;
