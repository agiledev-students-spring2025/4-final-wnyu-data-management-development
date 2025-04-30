import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./StaffFavoritesPage.css";

const StaffFavoritesPage = () => {
  const [albums, setAlbums] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user role from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setUserRole(storedUser.role);
    } else {
      navigate("/unauthorized"); // redirect if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    if (userRole === "Admin") {
      fetch(`${process.env.REACT_APP_API_URL}api/albums/staff-favorites`)
      //fetch("http://localhost:8080/api/albums/staff-favorites")
        .then((res) => res.json())
        .then((data) => setAlbums(data))
        .catch((err) => console.error("Error fetching staff favorites:", err));
    }
  }, [userRole]);

  if (userRole !== "Admin") {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div className="staff-favorites-page">
      <div className="staff-favorites-container">
        <h2>Staff Favorites</h2>
        <div className="staff-favorites-album-grid">
          {albums.length > 0 ? (
            albums.map((album) => (
              <Link to={`/album/${album._id}`} key={album._id} className="album-link-wrapper">
                <div className="staff-favorites-album-item">
                  <div className="staff-favorites-album-meta">
                    <span className={`staff-favorites-album-format-box album-format-${album.format.toLowerCase()}`}>
                      {album.format}
                    </span>
                    <span className="staff-favorites-album-release-year">
                      {album.releaseDate?.slice(0, 4) || "—"}
                    </span>
                  </div>
                  <img
                  src={album.imageUrl || "/default-album-cover.png"}
                  alt={album.title}
                  className="staff-favorites-album-image"
                  />
                  <div className="staff-favorites-album-details">
                    <h3 className="staff-favorites-album-title">{album.title}</h3>
                    <p className="staff-favorites-album-artist">{album.artist}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No staff favorites found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffFavoritesPage;
