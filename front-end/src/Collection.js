import React from "react";
import { Link } from "react-router-dom";
import "./Collection.css";

const Collection = ({ albums = [] }) => {
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
                <p className="artist-name">Artist Name</p>
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
