import React from "react";
import './Home.css';
import HorizontalScroll from "./HorizontalScroll";

const Home = ({ newlyAddedAlbums, staffFavorites, expandedAlbum, onAlbumClick }) => {
    return (
      <div className="home-container">
        {/* Newly Added Albums */}
        <div className="slider-section">
          <h2 className="slider-title">Newly Added</h2>
          <div className="scroll-container">
            {newlyAddedAlbums.map((album) => (
              <div
                key={album.id}
                className="album-item"
                onClick={() => onAlbumClick(album)}
                style={{
                  border: expandedAlbum?.id === album.id ? "2px solid blue" : "none", // Optional highlight when expanded
                }}
              >
                <img src={album.imageUrl} alt={album.title} />
                <h3>{album.title}</h3>
              </div>
            ))}
          </div>
        </div>
  
        {/* Staff Favorites */}
        <div className="slider-section">
          <h2 className="slider-title">Staff Favorites</h2>
          <div className="scroll-container">
            {staffFavorites.map((album) => (
              <div
                key={album.id}
                className="album-item"
                onClick={() => onAlbumClick(album)}
                style={{
                  border: expandedAlbum?.id === album.id ? "2px solid blue" : "none", // Optional highlight when expanded
                }}
              >
                <img src={album.imageUrl} alt={album.title} />
                <h3>{album.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default Home;