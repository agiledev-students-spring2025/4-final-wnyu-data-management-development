import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import StaffFavoritesPage from "./StaffFavoritesPage";
import ResetPassword from "./ResetPassword";
import { NotificationProvider } from "./context/NotificationContext";

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
      <NotificationProvider>
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
              <Route path="/album/:id" element={<AlbumPage />} />
              <Route
                path="/Collection"
                element={<Collection onAlbumClick={handleAlbumClick} />}
              />
              <Route
                path="/Contacts"
                element={<Contacts onContactClick={handleContactClick} />}
              />
              <Route
                path="/contact/:id"
                element={<Contact contact={selectedContact} />}
              />
              <Route path="/AddCollection" element={<AddCollection />} />
              <Route
                path="/AddBulkCollection"
                element={<AddBulkCollection />}
              />
              <Route path="/AddContact" element={<AddContact />} />
              <Route
                path="/admin/staff-favorites"
                element={<StaffFavoritesPage />}
              />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/reset-password/:email" element={<ResetPassword />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </NotificationProvider>
    </Router>
  );
};

export default App;
