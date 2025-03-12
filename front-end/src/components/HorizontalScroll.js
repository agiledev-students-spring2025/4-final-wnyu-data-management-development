import React from "react";
import "./HorizontalScroll.css";

const HorizontalScroll = ({ albums, expandedAlbum, onAlbumClick }) => {
  return (
    <div className="scroll-container">
      {albums.map((album) => (
        <div className="album" key={album.id} onClick={() => onAlbumClick(album)}>
          <img src={album.imageUrl} alt={album.title} />
          <h3>{album.title}</h3>

          {/* Show expanded album details if this album is clicked */}
          {expandedAlbum && expandedAlbum.id === album.id && (
            <div className="album-detail">
              <p>{expandedAlbum.description}</p>
              <img src={expandedAlbum.imageUrl} alt={expandedAlbum.title} />
            </div>
          )} 
        </div>
      ))}
    </div>
  );
};

export default HorizontalScroll;