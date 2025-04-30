import express from "express";
import cors from "cors";
import fs from "fs";
import albumRoutes from "./routes/albums.js";
import searchRoutes from "./routes/search.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import "./config.js";
import "./db.js";

import { User, Contact } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(express.json());

// mount routes
app.use("/api/albums", albumRoutes);
app.use("/api/search", searchRoutes);

// Load fake users from the JSON file
const loadUsers = () => {
  try {
    const data = fs.readFileSync("./users.json", "utf-8");
    return data.trim() ? JSON.parse(data) : []; // Ensure empty file doesn't break JSON.parse
  } catch (error) {
    console.error("Error reading users.json:", error);
    return []; // Return an empty array if the file is missing
  }
};

// Load fake users from the JSON file
const loadContacts = () => {
  try {
    const data = fs.readFileSync("./contacts.json", "utf-8");
    return data.trim() ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading users.json:", error);
    return [];
  }
};

// Save users to the JSON file
const saveUsers = (users) => {
  try {
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving users.json:", error);
  }
};

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found. " });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials. " });
    }

    const payload = { id: user._id, role: user.role };

    // Determine the right secret key based on role
    let accessToken;
    if (user.role === "Staff") {
      accessToken = jwt.sign(payload, process.env.STAFF_ACCESS_TOKEN);
    } else if (user.role === "Admin") {
      accessToken = accessToken = jwt.sign(
        payload,
        process.env.ADMIN_ACCESS_TOKEN
      );
    } else {
      return res.status(403).json({ message: "Unauthorized role." });
    }

    res.status(200).json({
      message: "Login successful.",
      accessToken,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user. " });
  }
});

// Sign Up Route
app.post("/signup", async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username is already taken." });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      hash: hashedPassword,
      email,
      role,
    });

    await newUser.save();

    const payload = { id: newUser._id, role: newUser.role };

    let accessToken;
    if (newUser.role == "Staff") {
      accessToken = jwt.sign(payload, process.env.STAFF_ACCESS_TOKEN);
    } else {
      accessToken = jwt.sign(payload, process.env.ADMIN_ACCESS_TOKEN);
    }

    res.status(201).json({
      accessToken: accessToken,
      message: "User registered successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// middleware for authenticating tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required." });
  }

  // Decode the token without verifying first to get the role
  const decoded = jwt.decode(token);
  if (!decoded || !decoded.role) {
    return res.status(400).json({ message: "Invalid token payload." });
  }

  let secret;
  if (decoded.role === "Staff") {
    secret = process.env.STAFF_ACCESS_TOKEN;
  } else if (decoded.role === "Admin") {
    secret = process.env.ADMIN_ACCESS_TOKEN;
  } else {
    return res.status(403).json({ message: "Invalid user role." });
  }

  // Verify the token with the correct secret
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  });
}

app.post("/resend-reset-link", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required." });
  
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.GMAIL_HOST,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Testing link
      // const resetLink = `http://localhost:3000/reset-password/${encodeURIComponent(email)}`;

      // Deployment link
      //const resetLink = `${process.env.REACT_APP_API_URL}reset-password/${encodeURIComponent(email)}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      });
  
      res.status(200).json({ message: "Reset link sent." });
    } catch (error) {
      console.error("Error sending reset link:", error);
      res.status(500).json({ message: "Failed to send reset link." });
    }
});
  

// Reset Password Route
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required.' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found.' });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.hash = hashedPassword;
  await user.save();

  res.status(200).json({ message: 'Password reset successful.' });
});


// Contacts Route
app.get("/contacts", async (req, res) => {
  try {
    let contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error getting contacts" });
  }
});

// Contact Route
app.get("/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting contact." });
  }
});

// Add Contacts
app.post("/contacts/add", async (req, res) => {
  const { name, role, email, phone } = req.body;

  if (!name || !role || !email || !phone) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // create new id for new contact
  const last = await Contact.findOne().sort({ id: -1 }).limit(1);
  const newId = last ? last.id + 1 : 1;

  const newContact = new Contact({
    id: newId,
    name,
    role,
    email,
    phone,
  });

  await newContact.save();
  res
    .status(201)
    .json({ message: "Contact added successfully.", contact: newContact });
});

// Remove Contacts
app.delete('/contacts/:id', async (req, res) => {

  try {
      const contactId = req.params.id;
      const result = await Contact.findOneAndDelete({ id: contactId });

      if (result) {
          res.status(200).send({ message: "Contact deleted successfully" });
      } else {

          res.status(404).send({ message: "Contact not found" });
      }

  } catch (error) {

      console.error("Error deleting contact:", error);
      res.status(500).send({ message: "Error" });
  }
});

// Server Start
console.log("Starting server...");
app.listen(process.env.PORT ?? 8080, () => {
  console.log("Server running on port", process.env.PORT ?? 8080);
});

app.get("/", (req, res) => {
  res.send("Welcome to the WNYU Archives");
});

export default app;

/* JSON Sign Up Route
app.post('/signup', (req, res) => {
    const { username, password, email, role } = req.body;
    let users = loadUsers();

    // Check if user already exists
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    // Create new user object
    const newUser = { username, password, email, role };
    
    // Append user to array and save
    users.push(newUser);
    saveUsers(users);

    res.status(201).json({
        message: 'User registered successfully',
        user: { username, email, role }
    });
});
*/

/* JSON Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        role: user.role,
        email: user.email
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});
*/
