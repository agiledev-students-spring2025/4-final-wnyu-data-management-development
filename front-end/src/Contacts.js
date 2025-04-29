import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Contacts.css";

const Contacts = ({ onContactClick }) => {

    const [contacts, setContacts] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [removeMessage, setRemoveMessage] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {

        const fetchContacts = async() => {

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}contacts`);
                //const response = await fetch("http://localhost:8080/contacts");
                const data = await response.json();
                setContacts(data);
            } catch (error) {

                console.error("Couldn't fetch contacts:", error);
            }
        };

        fetchContacts();

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.role) {
          setUserRole(storedUser.role);
        }

    }, []);

    const handleDeleteContact = async (id) => {

        try {
            await fetch(`${process.env.REACT_APP_API_URL}contacts/${id}`, {
            //await fetch(`http://localhost:8080/contacts/${id}`, {
                method: "DELETE",
            });

            setContacts((prev) => prev.filter((contact) => contact.id !== id));

            setContactToDelete(null);
            setRemoveMode(false);
            setRemoveMessage(false);

        } catch (error) {

            console.error("Error deleting contact: ", error);
        }
    }

    return (
        <div className="contacts-page-container">
          <div className="contacts-container">
              <div className="contacts-header">
                  <h2>Contacts</h2>
                  {userRole === "Staff" || userRole === "Admin" ? (
                  <>
                      <Link to="/AddContact" className="add-contact-button">Add Contact</Link>
                      <button 
                      className="add-contact-button"
                      onClick={() => {
                          const newRemoveMode = !removeMode;
                          setRemoveMode(newRemoveMode);
                          setRemoveMessage(newRemoveMode);
                      }}
                      >
                          {removeMode ? "Cancel Remove" : "Remove Contact"}
                      </button>
                      {removeMessage && (
                          <p className="remove-contact-message">
                              Select a contact to remove.
                          </p>
                      )}
                  </>
                  ) : null}
              </div>
              <div className="contacts-grid">
                  {contacts.map((contact) => (
                      <div key={contact.id} className="contact-card-wrapper">
                          <div
                          className="contact-card"
                          onClick={() => {
                              if (removeMode) {
                                  setContactToDelete(contact);
                              } else {
                                  onContactClick(contact);
                                  navigate(`/contact/${contact.id}`);
                              }
                          }}
                          >
                          <img src={"/profile.png"} alt={contact.name} className="contact-photo" />
                          <div className="contact-info">
                              <h3>{contact.name}</h3>
                              <p className="contact-title">{contact.role}</p>
                              <p className="contact-email">{contact.email}</p>
                              <p className="contact-phone">{contact.phone}</p>
                          </div>
                      </div>
                  </div>
                  ))}
              </div>
  
              {contactToDelete && (
                  <div className="confirm-delete-box">
                      <p>
                          Are you sure you want to delete{" "}
                          <strong>{contactToDelete.name}</strong>?
                      </p>
                      <button
                      className="confirm-delete-button"
                      onClick={() => handleDeleteContact(contactToDelete.id)}
                      >
                          Yes
                      </button>
                      <button
                      className="cancel-delete-button"
                      onClick={() => setContactToDelete(null)}
                      >
                          Cancel
                      </button>
                  </div>
              )}
          </div>
        </div>
    );
};

export default Contacts;
