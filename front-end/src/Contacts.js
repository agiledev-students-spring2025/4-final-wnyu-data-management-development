import React from "react";
import "./Contacts.css";

const Contacts = ({ contacts = [] }) => {
    return (
        <div className="contacts-container">
            <h2>Contacts</h2>
            <div className="contacts-grid">
                {contacts.map((contact) => (
                    <div key={contact.id} className="contact-card">
                        <img src={contact.photoURL} alt={contact.name} className="contact-photo" />
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
