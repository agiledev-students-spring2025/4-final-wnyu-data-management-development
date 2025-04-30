import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "./AlbumPage.css";

const AlbumPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [userRole, setUserRole] = useState(null);
  const [album, setAlbum] = useState(location.state?.album || null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(!location.state?.album);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    format: "",
    releaseDate: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setUserRole(storedUser.role);
    }

    if (!album && id) {
      fetchAlbum();
    } else if (album) {
      populateForm(album);
      setIsFavorite(album.staffFavorite || false);
    }
  }, [album, id]);

  const fetchAlbum = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/albums/${id}`
      );
      // const res = await fetch(`http://localhost:8080/api/albums/${id}`);
      if (!res.ok) throw new Error("Failed to fetch album");
      const data = await res.json();
      setAlbum(data);
      populateForm(data);
    } catch (error) {
      console.error("Error fetching album:", error);
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (data) => {
    setFormData({
      title: data.title || "",
      artist: data.artist || "",
      genre: data.genre || "",
      format: data.format || "",
      releaseDate: data.releaseDate || "",
      description: data.description || "",
      imageUrl: data.imageUrl || "",
    });
  };

  const toggleFavorite = async () => {
    console.log("Sending favorite toggle request", album._id, !isFavorite);
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/albums/${album._id}/staff-favorite`,
        // `http://localhost:8080/api/albums/${album._id}/staff-favorite`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isFavorite: !isFavorite }),
        }
      );

      if (res.ok) {
        setIsFavorite((prev) => !prev);
      } else {
        console.error("Failed to toggle favorite");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/collection");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this album?")) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/albums/${album._id}`,
          // `http://localhost:8080/api/albums/${album._id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          alert("Album deleted successfully!");
          navigate("/collection");
        } else {
          const errorData = await res.json();
          alert(`Failed to delete album: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting album:", error);
        alert("Error deleting album.");
      }
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/albums/${album.id}`,
        // `http://localhost:8080/api/albums/${album.id}`,
        {
          //const res = await fetch(`http://localhost:8080/api/albums/${album.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("Album updated!");
        setShowEditModal(false);
        fetchAlbum();
      } else {
        const errorData = await res.json();
        alert(`Failed to update album: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating album:", error);
      alert("Error updating album.");
    }
  };

  if (loading) {
    return (
      <div className="album-page">
        <p>Loading album...</p>
      </div>
    );
  }

  if (!album) {
    return (
      <div
        className="album-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>No album found</h2>
          <p>Please select an album from the catalog.</p>
          <Link to="/collection">Go to Albums</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="album-page">
      <div style={{ position: "relative" }}>
        <button onClick={handleBack} className="back-button">
          ←
        </button>
        {(userRole === "Staff" || userRole === "Admin") && (
          <button
            className={`star-button ${isFavorite ? "filled" : ""}`}
            onClick={toggleFavorite}
            disabled={loading}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        )}
      </div>

      <div className="album-image-container">
        <img
          src={album.imageUrl || "/default-album-cover.png"}
          alt={album.title}
          className="album-photo"
          onError={(e) => (e.target.src = "/default-album-cover.png")}
        />
      </div>

      <div className="album-info">
        <h1 className="album-title">{album.title}</h1>
        <h2 className="album-artist">{album.artist}</h2>

        <div className="album-meta">
          <div className="meta-item">
            <span className="meta-label">Genre</span>
            <div className="genre-badge">{album.genre || "Unknown"}</div>
          </div>

          <div className="meta-item">
            <span className="meta-label">Format</span>
            <div className="meta-value">{album.format || "Unknown"}</div>
          </div>

          <div className="meta-item">
            <span className="meta-label">Release Date</span>
            <div className="meta-value">{album.releaseDate || "Unknown"}</div>
          </div>

          <div className="meta-item">
            <span className="meta-label">Description</span>
            <div className="meta-value">
              {album.description || "No description."}
            </div>
          </div>
        </div>

        {(userRole === "Staff" || userRole === "Admin") && (
          <div className="action-buttons">
            <button
              className="spotify-button"
              onClick={() => setShowEditModal(true)}
            >
              Edit Album
            </button>
            <button
              className="spotify-button"
              onClick={handleDelete}
              style={{ marginLeft: "10px", backgroundColor: "red" }}
            >
              Delete Album
            </button>
            {userRole === "Admin" && (
              <Link to="/admin/staff-favorites" className="admin-link">
                View All Staff Favorites
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Album</h2>
            <form onSubmit={handleFormSubmit} className="edit-form">
              {[
                "title",
                "artist",
                "genre",
                "format",
                "releaseDate",
                "description",
                "imageUrl",
              ].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleFormChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              ))}

              <div style={{ marginTop: "10px" }}>
                <button type="submit" className="spotify-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="spotify-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumPage;