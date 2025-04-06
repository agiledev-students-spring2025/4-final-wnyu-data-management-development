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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="add-collection-container">
      <form className="add-collection-form" onSubmit={handleSubmit}>
        <h3>Add Collection Item</h3>

        <label className="add-collection-input">Album Title</label>
        <input type="text" className="add-input-field" placeholder="" />

        <label className="add-collection-input">Artist Name</label>
        <input type="email" className="add-input-field" placeholder="" />

        <label className="add-collection-input">Genre</label>
        <input type="text" className="add-input-field" placeholder="" />

        <label className="add-collection-input">Format</label>
        <input type="text" className="add-input-field" placeholder="" />

        <label className="add-collection-input">Release Date</label>
        <input type="text" className="add-input-field" placeholder="" />

        <label className="add-collection-input">Photo</label>
        <input type="file" className="add-input-field" accept="image/*" />

        <label className="add-collection-input">Description</label>
        <input type="text" className="add-input-field" placeholder="" />

        <button
          className="add-collection-button"
          onClick={() => navigate("/collection")}
        >
          Add
        </button>
      </form>
    </div>
  );
};
export default AddCollection;
