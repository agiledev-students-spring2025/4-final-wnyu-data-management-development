import React from 'react';

const AlbumPage = ({ album }) => {
  if (!album) return <div>No album selected</div>;
  return (
    <div className="album-page">
      <img src={album.imageUrl} alt={album.title} className="album-photo" />
      <h1>{album.title}</h1>
      <p>Genre: {album.genre}</p>
      <p>Year: {album.year}</p>
      <p>Country: {album.country}</p>
      <p>Year Added: {album.yearAdded}</p>
      <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <button onClick={() => window.open('https://spotify.com', '_blank')}>Listen on Spotify</button>
    </div>
  );
};

export default AlbumPage;