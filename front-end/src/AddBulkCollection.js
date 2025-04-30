import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCollection.css";
import "./Signup.css";

const AddBulkCollection = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/albums/bulk`,
        {
          //const res = await fetch("http://localhost:8080/api/albums/bulk", {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.ok) {
        setMessage(`Uploaded ${result.count} albums. Redirecting...`);
        setTimeout(() => navigate("/collection"), 1500);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (err) {
      setMessage(`Upload failed: ${err.message}`);
    }
  };

  const handleDownloadTemplate = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}api/albums/bulk/template`,
      "_blank"
    );
    // window.open("http://localhost:8080/api/albums/bulk/template", "_blank");
  };

  return (
    <div className="add-collection-container">
      <form className="add-collection-form" onSubmit={handleUpload}>
        <h3>Bulk Upload Albums (CSV)</h3>

        <button
          className="add-collection-button"
          type="button"
          onClick={handleDownloadTemplate}
        >
          Download Template
        </button>

        <label className="add-collection-input">Upload a CSV File</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="add-input-field"
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="add-collection-button" type="submit">
            Upload
          </button>
        </div>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </form>
    </div>
  );
};

export default AddBulkCollection;
