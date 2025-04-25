import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./AlbumPage.css";

const AlbumPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/albums/${id}`);
        if (!res.ok) throw new Error("Album not found");
        const data = await res.json();
        setAlbum(data);
        setIsFavorite(data.staffFavorite || false);
      } catch (err) {
        console.error("Failed to fetch album:", err);
        setLoadFailed(true);
      } finally {
        setLoading(false);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setUserRole(storedUser.role);
    }

    fetchAlbum();
  }, [id]);

  const toggleFavorite = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/albums/${album._id}/staff-favorite`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: !isFavorite }),
      });

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

  if (loadFailed) return <p>Album not found.</p>;
  if (!album) return null; 

  return (
    <div className="album-page">
      <img
        src={album.imageUrl || "/default-album-cover.png"}
        alt={album.title}
        className="album-photo"
        style={{ width: "300px", height: "auto" }}
      />
      <h1>{album.title}</h1>
      {(userRole === "Admin" || userRole === "Staff") && (
        <button
          className={`star-button ${isFavorite ? "filled" : ""}`}
          onClick={toggleFavorite}
          disabled={loading}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      )}
      {userRole === "Admin" && (
        <Link to="/admin/staff-favorites" className="admin-link">
          View All Staff Favorites
        </Link>
      )}

      <p>Genre: {album.genre}</p>
      <p>Year: {album.year}</p>
      <p>Country: {album.country}</p>
      <p>Year Added: {album.yearAdded}</p>
      <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <button onClick={() => window.open("https://spotify.com", "_blank")}>
        Listen on Spotify
      </button>
    </div>
  );
};

export default AlbumPage;
