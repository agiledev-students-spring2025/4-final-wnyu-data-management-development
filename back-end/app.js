import express from 'express';
import cors from 'cors';
import fs from 'fs';
import albumRoutes from './routes/albums.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import './config.js';
import './db.js';

import { User } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use('/api/albums', albumRoutes);

// Middleware
app.use(express.json());
app.use(cors());

// Load fake users from the JSON file
const loadUsers = () => {
    try {
      const data = fs.readFileSync('./users.json', 'utf-8');
      return data.trim() ? JSON.parse(data) : []; // Ensure empty file doesn't break JSON.parse
    } catch (error) {
      console.error("Error reading users.json:", error);
      return []; // Return an empty array if the file is missing
    }
};

// Load fake users from the JSON file
const loadContacts = () => {
  try {
    const data = fs.readFileSync('./contacts.json', 'utf-8');
    return data.trim() ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading users.json:", error);
    return [];
  }
};

// Save users to the JSON file
const saveUsers = (users) => {
    try {
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error saving users.json:", error);
    }
};

// Login Route
app.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;

        // check if user exists
        const user = await User.findOne({ username });
        if (!user){
            return res.status(404).json({ message: 'User not found. ' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.hash);
        if (!isPasswordValid){
            return res.status(401).json({ message: 'Invalid credentials. '});
        }

        res.status(200).json({
            message: 'Login successful.',
            user: {
              username: user.username,
              email: user.email,
              role: user.role,
            }
        });
      
    }catch(error){
        res.status(500).json({ message: 'Error logging in user. '});
    }
});

// Sign Up Route
app.post('/signup', async (req, res) => {
    try{
        const { username, password, email, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username is already taken.' });
        }
            const salt = 10;
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                hash: hashedPassword,
                email,
                role
            });

            await newUser.save();

            res.status(201).json({ message: 'User registered successfully.' });
    }catch(error){
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/resend-reset-link', (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    // Simulate sending a reset link
    console.log(`Password reset link sent to ${email}`);
    
    return res.status(200).json({ message: 'Password Reset Email is sent' });
});

// Contacts Route
app.get('/contacts', (req, res) => {

  let users = loadContacts();
  res.json(users)
});

// Contact Route
app.get('/contact/:id', (req, res) => {

  const { id } = req.params;
  const users = loadContacts();
  const contact = users.find(user => String(user.id) === id);

  if (contact) {

    res.json(contact);
  } else {

    res.status(404).json({ message: "Contact not found" });
  }
})

// Server Start
console.log("Starting server...");
app.listen(process.env.PORT ?? 8080, () => {
  console.log("Server running on port", process.env.PORT ?? 8080);
});

app.get('/', (req, res) => {
  res.send('Welcome to the WNYU Archives');
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
