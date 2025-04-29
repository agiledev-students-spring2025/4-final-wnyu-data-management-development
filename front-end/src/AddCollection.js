import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddCollection.css";
import "./Signup.css";

const AddCollection = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [format, setFormat] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/albums/add`, {
      //const response = await fetch("http://localhost:8080/api/albums/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          artist,
          genre,
          format,
          releaseDate,
          description,
          imageUrl: coverImage, // field expected by the backend
        }),
      });

      if (response.ok) {
        alert("Album added!");
        navigate("/collection");
      } else {
        const errorData = await response.json();
        alert(`Failed to add album: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="add-collection-container">
      <form className="add-collection-form" onSubmit={handleSubmit}>
        <h3>Add Collection Item</h3>

        <label className="add-collection-input">Album Title</label>
        <input
          type="text"
          className="add-input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="add-collection-input">Artist Name</label>
        <input
          type="text"
          className="add-input-field"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <label className="add-collection-input">Genre</label>
        <input
          type="text"
          className="add-input-field"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <label className="add-collection-input">Format</label>
        <input
          type="text"
          className="add-input-field"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        />

        <label className="add-collection-input">Release Date</label>
        <input
          type="text"
          className="add-input-field"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />

        <label className="add-collection-input">Image URL</label>
        <input
          type="text"
          className="add-input-field"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <label className="add-collection-input">Description</label>
        <input
          type="text"
          className="add-input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="add-collection-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCollection;
