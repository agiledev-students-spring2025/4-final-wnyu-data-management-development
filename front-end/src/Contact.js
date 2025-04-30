import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        // const response = await fetch(
        //   `${process.env.REACT_APP_API_URL}contacts`
        // );
        const response = await fetch(`http://localhost:8080/contacts`);
        const data = await response.json();
        const foundContact = data.find((c) => String(c.id) === id);
        setContact(foundContact);
      } catch (error) {
        console.error("Couldn't fetch contact:", error);
      }
    };

    fetchContact();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setUserRole(storedUser.role);
    }
  }, [id]);

  if (!contact) {
    return (
      <div className="contact-page" style={{ justifyContent: "center" }}>
        <div className="loading-spinner"></div>
        <p>Loading contact information...</p>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <Link to="/contacts" className="back-button">
        ←
      </Link>
      <img
        src={"/profile.png"}
        alt={contact.name}
        className="contact-page-photo"
      />
      <h1>{contact.name}</h1>
      <h2>{contact.role}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      {contact.bio && <p>{contact.bio}</p>}
    </div>
  );
};

export default Contact;
