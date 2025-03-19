import React from 'react';
import "./Contact.css";

const Contact = ({ contact }) =>{
  if(!contact) return <div>No contact selected</div>;

  return (
    <div className="contact-page"> 
      <img src={contact.photoURL} alt={contact.name} className="contact-page-photo"/>
      <h1>{contact.name}</h1>
      <h2>{contact.title}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>{contact.bio}</p>
    </div>
  );
};

export default Contact;