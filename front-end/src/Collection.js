import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Collection.css";

const Collection = ({ onAlbumClick }) => {
  const [albums, setAlbums] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/albums");
        const data = await response.json();
        setAlbums(data); // Store the data in state
        console.log("Fetched albums:", data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setUserRole(storedUser.role);
    }
  }, []);

  return (
    <div className="collection-container">
      <h2>Album Collection</h2>
      {userRole === "Staff" || userRole === "Admin" ? (
        <>
          <Link to="/AddCollection" className="add-collection-button">
            Add Collection Item
          </Link>
          <Link to="/AddBulkCollection" className="add-collection-button">
            Add Bulk Collection
          </Link>
        </>
      ) : null}
      <div className="album-grid">
        {albums.length > 0 ? (
          albums.map((album, index) => (
            <Link
              to={`/album/${album.id}`}
              key={index}
              onClick={() => onAlbumClick(album)}
            >
              <div className="album-item">
                {/* Format box and ID */}
                <div className="album-meta">
                  <span
                    className={`album-format-box ${
                      album.format === "Vinyl"
                        ? "album-format-vinyl"
                        : "album-format-cd"
                    }`}
                  >
                    {album.format}
                  </span>
                  <span className="album-id">{album.id}</span>
                </div>

                {/* Separator Line */}
                <div className="separator"></div>

                {/* Album Image */}
                <img
                  src={album.imageUrl || "/default-album-cover.png"}
                  alt={album.title}
                  className="album-image"
                />

                {/* Album Details */}
                <div className="album-details">
                  <h3 className="album-title">{album.title}</h3>
                  <p className="album-artist">{album.artist}</p>
                  <p className="album-genre">{album.genre}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No albums available</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
