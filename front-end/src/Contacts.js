import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./Contacts.css";

const Contacts = ({ onContactClick }) => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async() => {
            try {
                const response = await fetch("http://localhost:8080/contacts");
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error("Couldn't fetch contacts:", error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="contacts-container">
            <div className="contacts-header">
                <h2>Contacts</h2>
                <Link to="/AddContact" className="add-contact-button">Add Contact</Link>
            </div>
            <div className="contacts-grid">
                {contacts.map((contact) => (
                    <div key={contact.id} className="contact-card">
                        <Link to={`/contact/${contact.id}`} onClick={() => onContactClick(contact)}>
                            <img src={"/profile.png"} alt={contact.name} className="contact-photo" />
                        </Link>
                        <div className="contact-info">
                            <h3>{contact.name}</h3>
                            <p className="contact-title">{contact.role}</p>
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