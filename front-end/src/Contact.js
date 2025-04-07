import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Contact.css";

const Contact = () => {

  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {

    const fetchContact = async () => {

      try {

        const response = await fetch(`http://localhost:3000/contacts`);
        const data = await response.json();
        const foundContact = data.find(c => String(c.id) === id);
        setContact(foundContact);
      } catch (error) {

        console.error("Couldn't fecth contact:", error)
      }
    };

    fetchContact();
  }, [id]);

  return (
    <div className="contact-page">
      <img
        src={contact.photoURL}
        alt={contact.name}
        className="contact-page-photo"
      />
      <h1>{contact.name}</h1>
      <h2>{contact.role}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>{contact.bio}</p>
    </div>
  );
};

export default Contact;
