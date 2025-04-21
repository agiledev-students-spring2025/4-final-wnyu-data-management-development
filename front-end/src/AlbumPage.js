import React from 'react';
import { Link } from 'react-router-dom';
import "./AlbumPage.css";

const AlbumPage = ({ album }) => {
  if(!album) return (
    <div className="album-page" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div style={{textAlign: "center"}}>
        <h2>No album selected</h2>
        <p>Please select an album from the catalog.</p>
        <Link to="/albums">Go to Albums</Link>
      </div>
    </div>
  );

  // Format year if it exists
  const formattedYear = album.year ? album.year : "Unknown";
  // Format country if it exists
  const formattedCountry = album.country ? album.country : "Unknown";
  // Format year added if it exists
  const formattedYearAdded = album.yearAdded ? album.yearAdded : "Unknown";

  return (
    <div className="album-page">
      <Link to="/albums" className="back-button">
        ←
      </Link>
      
      <div className="album-image-container">
        <img src={album.imageUrl} alt={album.title} className="album-photo" />
        <div className="record-spin"></div>
      </div>
      
      <div className="album-info">
        <h1 className="album-title">{album.title}</h1>
        <h2 className="album-artist">{album.artist || "Unknown Artist"}</h2>
        
        <div className="album-meta">
          <div className="meta-item">
            <span className="meta-label">Genre</span>
            <div className="genre-badge">{album.genre || "Unknown"}</div>
          </div>
          
          <div className="meta-item">
            <span className="meta-label">Year</span>
            <div className="meta-value">{formattedYear}</div>
          </div>
          
          <div className="meta-item">
            <span className="meta-label">Country</span>
            <div className="meta-value">{formattedCountry}</div>
          </div>
          
          <div className="meta-item">
            <span className="meta-label">Added to Collection</span>
            <div className="meta-value">{formattedYearAdded}</div>
          </div>

          {album.format && (
            <div className="meta-item">
              <span className="meta-label">Format</span>
              <div className="meta-value">{album.format}</div>
            </div>
          )}
        </div>
        
        <blockquote className="album-bio">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis justo eget nisl commodo euismod. Donec egestas, magna a fringilla rutrum, dolor nisi fringilla ante, id commodo diam tellus quis felis.
        </blockquote>
        
        <div className="action-buttons">
          <button 
            className="spotify-button" 
            onClick={() => window.open('https://spotify.com', '_blank')}
          >
            <svg className="spotify-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Listen on Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;