import express from 'express';
import cors from 'cors';
import fs from 'fs';
import albumRoutes from './routes/albums.js';
import searchRoutes from './routes/search.js';
import dotenv from 'dotenv';
import connectDB from './db.js';
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "./config.js";
import "./db.js";

import { User } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/api/albums', albumRoutes);
app.use("/api/search", searchRoutes);

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

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

app.post("/resend-reset-link", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Simulate sending a reset link
  console.log(`Password reset link sent to ${email}`);

  return res.status(200).json({ message: "Password Reset Email is sent" });
});

// Contacts Route
app.get("/contacts", (req, res) => {
  let users = loadContacts();
  res.json(users);
});

// Contact Route
app.get("/contact/:id", (req, res) => {
  const { id } = req.params;
  const users = loadContacts();
  const contact = users.find((user) => String(user.id) === id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact not found" });
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
