import React from "react";
import './Home.css';
import HorizontalScroll from "./HorizontalScroll";

const Home = ({ albums, expandedAlbum, onAlbumClick }) => {
    return (
      <div className="centered-container">
        <div className="scroll-container">
          {albums.map((album) => (
            <div
              key={album.id}
              className="album-item"
              onClick={() => onAlbumClick(album)}
              style={{
                border: expandedAlbum?.id === album.id ? "2px solid blue" : "none",
              }}
            >
              <img src={album.imageUrl} alt={album.title} />
              <h3>{album.title}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Home;