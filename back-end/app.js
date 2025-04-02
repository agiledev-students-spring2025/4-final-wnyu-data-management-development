import express from 'express';
import cors from 'cors';
import fs from 'fs';
import albumRoutes from './routes/albums.js';

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

// Save users to the JSON file
const saveUsers = (users) => {
    try {
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error saving users.json:", error);
    }
};

// Login Route
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

// Signup Route
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


// Server Start
console.log("Starting server...");
app.listen(process.env.PORT ?? 8080, () => {
  console.log("Server running on port", process.env.PORT ?? 8080);
});

app.get('/', (req, res) => {
  res.send('Welcome to the WNYU Archives');
});

export default app;
