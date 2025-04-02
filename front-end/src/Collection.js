import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Collection.css";

const Collection = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/albums/new"); // Fetching from backend
        const data = await response.json();
        setAlbums(data); // Store the data in state
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="collection-container">
      <h2>Album Collection</h2>
      <div className="album-grid">
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album.id} className="album-item">
              <Link to={`/album/${album.id}`}>
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="album-image"
                />
              </Link>
              <div className="album-info">
                <p className="album-title">{album.title}</p>
                <p className="artist-name">{album.artist || "Unknown Artist"}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No albums available</p>
        )}
      </div>
    </div>
  );
};

export default Collection;