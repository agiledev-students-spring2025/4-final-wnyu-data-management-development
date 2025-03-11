import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Profile from './Profile';
import Footer from './Footer';

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

const App = () => {
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
      <Header /> {/* Add the header here */}
      <div className="App">
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
