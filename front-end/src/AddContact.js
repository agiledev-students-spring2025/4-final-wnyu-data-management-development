import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddContact.css';
import './Signup.css';

const AddContact = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
    
  return (
    <div className="add-contact-container">

        <form className="add-contact-form" onSubmit={handleSubmit}>
            <h3>Add Staff</h3>

            <label className="add-contact-input">Name</label>
            <input type="text" className="add-input-field" placeholder=""/>

            <label className="add-contact-input">Title</label>
            <input type="email" className="add-input-field" placeholder=""/>

            <label className="add-contact-input">Email</label>
            <input type="text" className="add-input-field" placeholder=""/>

            <label className="add-contact-input">Phone</label>
            <input type="text" className="add-input-field" placeholder=""/>

            <button className="add-contact-button" onClick={() => navigate('/contacts')}>Add</button>
        </form>
    </div>
  )
}
export default AddContact;