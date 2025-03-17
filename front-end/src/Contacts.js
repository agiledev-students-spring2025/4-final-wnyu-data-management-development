import React from "react";
import { Link } from "react-router-dom";
import "./Contacts.css";

const Contacts = ({ contacts = [], onContactClick }) => {
    return (
        <div className="contacts-container">
            <div className="contacts-header">
                <h2>Contacts</h2>
                <Link to="/AddContact" className="add-contact-button">Add Contact</Link>
            </div>
            <div className="contacts-grid">
                {contacts.map((contact, index) => (
                    <div key={contact.id} className="contact-card">
                        <Link to={`/contact/${contact.id}`} key={index} onClick={() => onContactClick(contact)}>
                            <img src={contact.photoURL} alt={contact.name} className="contact-photo" />
                        </Link>
                        <div className="contact-info">
                            <h3>{contact.name}</h3>
                            <p className="contact-title">{contact.title}</p>
                            <p className="contact-email">{contact.email}</p>
                            <p className="contact-phone">{contact.phone}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contacts;
