import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import Home from './Home';
import './App.css';

const albums = [
  { id: 1, title: "Album 1", imageUrl: "https://via.placeholder.com/200" },
  { id: 2, title: "Album 2", imageUrl: "https://via.placeholder.com/200" },
  { id: 3, title: "Album 3", imageUrl: "https://via.placeholder.com/200" },
  { id: 4, title: "Album 4", imageUrl: "https://via.placeholder.com/200" },
];

function App() {
  const [expandedAlbum, setExpandedAlbum] = useState(null);

  const handleAlbumClick = (album) => {
    if (expandedAlbum && expandedAlbum.id === album.id) {
      setExpandedAlbum(null); // Collapse if the same album is clicked again
    } else {
      setExpandedAlbum(album); // Expand the clicked album
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Album Gallery</h1>
        <Routes>
          {/* Wrap Home inside Route and use element prop */}
          <Route
            path="/"
            element={
              <Home
                albums={albums}
                expandedAlbum={expandedAlbum}
                onAlbumClick={handleAlbumClick}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
