import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import Home from './Home';
import './App.css';

const newlyAddedAlbums = [
  { id: 1, title: "Album 1", imageUrl: "/bitchesbrew.png" },
  { id: 2, title: "Album 2", imageUrl: "/bitchesbrew.png" },
  { id: 3, title: "Album 3", imageUrl: "/bitchesbrew.png" },
  { id: 4, title: "Album 4", imageUrl: "/bitchesbrew.png" },
  { id: 5, title: "Album 5", imageUrl: "/bitchesbrew.png" },
  { id: 6, title: "Album 6", imageUrl: "/bitchesbrew.png" },
];

const staffFavorites = [
  { id: 7, title: "Staff Favorite 1", imageUrl: "/bitchesbrew.png" },
  { id: 8, title: "Staff Favorite 2", imageUrl: "/bitchesbrew.png" },
  { id: 9, title: "Staff Favorite 3", imageUrl: "/bitchesbrew.png" },
  { id: 10, title: "Staff Favorite 1", imageUrl: "/bitchesbrew.png" },
  { id: 11, title: "Staff Favorite 2", imageUrl: "/bitchesbrew.png" },
  { id: 12, title: "Staff Favorite 3", imageUrl: "/bitchesbrew.png" },
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
              newlyAddedAlbums={newlyAddedAlbums}
              staffFavorites={staffFavorites}
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
