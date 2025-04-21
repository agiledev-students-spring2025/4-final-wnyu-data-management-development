import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Home";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import Collection from "./Collection";
import AddCollection from "./AddCollection";
import AlbumPage from "./AlbumPage"; 
import Contacts from "./Contacts";
import Contact from "./Contact";
import AddContact from "./AddContact";
import SearchResults from "./SearchResults";
import Footer from "./components/Footer";
import AddBulkCollection from "./AddBulkCollection";

// Wrapper component to fetch album data when navigating directly to an album page
function AlbumWrapper({ expandedAlbum, onAlbumClick }) {
  const { id } = useParams();
  const [fetchedAlbum, setFetchedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we already have the album from a click, use that
    if (expandedAlbum) {
      setFetchedAlbum(expandedAlbum);
      setLoading(false);
      return;
    }

    // Otherwise fetch the album data based on the ID
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/albums/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFetchedAlbum(data);
          // Update the parent state via callback
          if (onAlbumClick) onAlbumClick(data);
        } else {
          console.error('Failed to fetch album:', response.statusText);
        }
      } catch (err) {
        console.error('Error fetching album:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchAlbum();
    }
  }, [id, expandedAlbum, onAlbumClick]);

  if (loading) {
    return <div className="loading">Loading album details...</div>;
  }

  // Pass either the pre-loaded album or the fetched one
  return <AlbumPage album={expandedAlbum || fetchedAlbum} />;
}

const App = () => {
  const [expandedAlbum, setExpandedAlbum] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleAlbumClick = (album) => {
    setExpandedAlbum(album);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

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
              element={<AlbumWrapper expandedAlbum={expandedAlbum} onAlbumClick={handleAlbumClick} />}
            />
            <Route
              path="/Collection"
              element={<Collection onAlbumClick={handleAlbumClick} />}
            />
            <Route path="/albums" element={<Collection onAlbumClick={handleAlbumClick} />} />
            <Route
              path="/Contacts"
              element={<Contacts onContactClick={handleContactClick} />}
            />
            <Route
              path="/contact/:id"
              element={<Contact contact={selectedContact} />}
            />
            <Route path="/AddCollection" element={<AddCollection />} />
            <Route path="/AddBulkCollection" element={<AddBulkCollection />} />
            <Route path="/AddContact" element={<AddContact />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 

