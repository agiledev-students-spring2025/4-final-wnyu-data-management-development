import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import AlbumPage from './components/AlbumPage';
import Footer from './components/Footer';
import './App.css';

const newlyAddedAlbums = [
  { id: 1, title: "Album 1", imageUrl: "/bitchesbrew.png" },
  { id: 2, title: "Album 2", imageUrl: "/bitchesbrew.png" },
  { id: 3, title: "Album 3", imageUrl: "/bitchesbrew.png" },
  { id: 4, title: "Album 4", imageUrl: "/bitchesbrew.png" },
  { id: 5, title: "Album 5", imageUrl: "/bitchesbrew.png" },
  { id: 6, title: "Album 6", imageUrl: "/bitchesbrew.png" },
  { id: 7, title: "Album 7", imageUrl: "/bitchesbrew.png" },
  { id: 8, title: "Album 8", imageUrl: "/bitchesbrew.png" },
  { id: 9, title: "Album 9", imageUrl: "/bitchesbrew.png" },
  { id: 10, title: "Album 10", imageUrl: "/bitchesbrew.png" },
  { id: 11, title: "Album 11", imageUrl: "/bitchesbrew.png" },
  { id: 12, title: "Album 12", imageUrl: "/bitchesbrew.png" },
];

const staffFavorites = [
  { id: 13, title: "Staff Favorite 1", imageUrl: "/bitchesbrew.png" },
  { id: 14, title: "Staff Favorite 2", imageUrl: "/bitchesbrew.png" },
  { id: 15, title: "Staff Favorite 3", imageUrl: "/bitchesbrew.png" },
  { id: 16, title: "Staff Favorite 4", imageUrl: "/bitchesbrew.png" },
  { id: 17, title: "Staff Favorite 5", imageUrl: "/bitchesbrew.png" },
  { id: 18, title: "Staff Favorite 6", imageUrl: "/bitchesbrew.png" },
  { id: 19, title: "Staff Favorite 7", imageUrl: "/bitchesbrew.png" },
  { id: 20, title: "Staff Favorite 8", imageUrl: "/bitchesbrew.png" },
  { id: 21, title: "Staff Favorite 9", imageUrl: "/bitchesbrew.png" },
  { id: 22, title: "Staff Favorite 10", imageUrl: "/bitchesbrew.png" },
  { id: 23, title: "Staff Favorite 11", imageUrl: "/bitchesbrew.png" },
  { id: 24, title: "Staff Favorite 12", imageUrl: "/bitchesbrew.png" },
];

function App() {
  const [expandedAlbum, setExpandedAlbum] = useState(null);

  const handleAlbumClick = (album) => {
    setExpandedAlbum(album);
  };

  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                newlyAddedAlbums={newlyAddedAlbums}
                staffFavorites={staffFavorites}
                onAlbumClick={handleAlbumClick}
              />
            }
          />
          <Route
            path="/album/:id"
            element={<AlbumPage album={expandedAlbum}/>}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;