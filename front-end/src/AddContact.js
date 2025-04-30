import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddContact.css";
import "./Signup.css";

const AddContact = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContact = {
      name,
      role,
      email,
      phone,
    };

    try {
      // const response = await fetch("http://localhost:8080/contacts/add", {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}contacts/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/contacts");
      } else {
        alert(data.message || "Contact added failure");
      }
    } catch (error) {
      console.error("Error adding contact: ", error);
      alert("Error");
    }
  };

  return (
    <div className="add-contact-container">
      <form className="add-contact-form" onSubmit={handleSubmit}>
        <h3>Add Staff</h3>

        <label className="add-contact-input">Name</label>
        <input
          type="text"
          className="add-input-field"
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="add-contact-input">Role</label>
        <input
          type="text"
          className="add-input-field"
          placeholder=""
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <label className="add-contact-input">Email</label>
        <input
          type="text"
          className="add-input-field"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="add-contact-input">Phone</label>
        <input
          type="text"
          className="add-input-field"
          placeholder=""
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button className="add-contact-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddContact;
