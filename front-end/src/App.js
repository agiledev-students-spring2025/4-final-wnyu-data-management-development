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
import AddContact from "./AddContact";
import Footer from "./components/Footer";

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
  const [newlyAddedAlbums, setNewlyAddedAlbums] = useState([]);
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
              element={<Home onAlbumClick={handleAlbumClick} />}
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
              element={<Collection />}
            />
            <Route
              path="/Contacts"
              element={<Contacts contacts={staffContacts} onContactClick={handleContactClick} />}
            />
            <Route
              path="/contact/:id"
              element={<Contact contact={selectedContact} />}
            />
            <Route path="/AddContact" element={<AddContact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;