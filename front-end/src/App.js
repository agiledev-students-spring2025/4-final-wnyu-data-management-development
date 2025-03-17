import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Home from './Home';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Profile from './Profile';
import Collection from "./Collection";
import AlbumPage from "./AlbumPage";
import Contacts from "./Contacts";
import Contact from "./Contact";
import Footer from "./components/Footer";
import "./App.css";

const newlyAddedAlbums = [
  { id: 1, title: "Bitches Brew 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 2, title: "Bitches Brew 2", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 3, title: "Bitches Brew 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 4, title: "Bitches Brew 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 5, title: "Bitches Brew 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 6, title: "Bitches Brew 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 7, title: "Bitches Brew 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 8, title: "Bitches Brew 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
];

const staffFavorites = [
  { id: 13, title: "Staff Favorite 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 14, title: "Staff Favorite 2", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 15, title: "Staff Favorite 3", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 16, title: "Staff Favorite 4", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 17, title: "Staff Favorite 5", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 18, title: "Staff Favorite 6", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 19, title: "Staff Favorite 7", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 20, title: "Staff Favorite 8", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 21, title: "Staff Favorite 9", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 22, title: "Staff Favorite 10", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 23, title: "Staff Favorite 11", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 24, title: "Staff Favorite 12", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
];

const staffContacts = [
  {id: 1, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 2, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 3, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 4, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 5, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 6, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 7, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 8, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 9, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 10, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 11, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 12, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 13, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 14, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
  {id: 15, name: "Staff Member", title: "admin", email: "abc123@nyu.edu", phone: "012-345-6789", photoURL: "/profile.png", bio: "My name is and I was born in"},
];

const App = () => {
  const [expandedAlbum, setExpandedAlbum] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleAlbumClick = (album) => {
    setExpandedAlbum(album);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  }

  return (
    <Router>
<div className="app-container">
        <Header />
        <div className="main-content">
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/album/:id"
              element={<AlbumPage album={expandedAlbum} />}
            />
            <Route
              path="/Collection"
              element={<Collection albums={newlyAddedAlbums} />}
            />
            <Route
              path="/Contacts"
              element={<Contacts contacts={staffContacts} onContactClick={handleContactClick} />}
            />
            <Route
              path="/contact/:id"
              element={<Contact contact={selectedContact} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;