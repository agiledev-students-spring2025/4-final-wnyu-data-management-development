import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCollection.css";
import "./Signup.css";

const AddBulkCollection = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      return setMessage("Please select a CSV file.");
    }

    setUploading(true);
    setMessage("Uploading...");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/api/albums/bulk", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      setResults(result);
      
      if (res.ok) {
        setMessage(`Successfully uploaded ${result.count} albums.`);
        setTimeout(() => navigate("/collection"), 2000);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (err) {
      setMessage(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-collection-container">
      <form className="add-collection-form" onSubmit={handleUpload}>
        <h3>Bulk Upload Albums (CSV)</h3>

        <label className="add-collection-input">Upload a CSV File</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="add-input-field"
        />

        <button className="add-collection-button" type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </form>
    </div>
  );
};

export default AddBulkCollection;
