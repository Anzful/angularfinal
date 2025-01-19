// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'mysecretkey';

const users = [
  { email: 'admin@admin.com', password: 'admin', role: 'admin' },
  { email: 'user@user.com', password: 'user', role: 'user' }
];

// Mock guitars
let guitars = [
  { id: 1, name: 'Stratocaster', brand: 'Fender', price: 999 },
  { id: 2, name: 'Les Paul', brand: 'Gibson', price: 1299 },
];

const app = express();
app.use(cors());
app.use(bodyParser.json());

// REGISTER
app.post('/api/register', (req, res) => {
  const { email, password, role } = req.body;

  // Check if already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already taken' });
  }

  // Otherwise create new user
  users.push({ email, password, role });
  return res.json({ message: 'User registered successfully' });
});

// LOGIN
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Create JWT
  const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({
    token,
    email: user.email,
    role: user.role
  });
});

// GET GUITARS
app.get('/api/guitars', (req, res) => {
  res.json(guitars);
});

// For creating a guitar (admin only)
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

app.post('/api/guitars', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  const { name, brand, price } = req.body;
  const newId = guitars.length ? guitars[guitars.length - 1].id + 1 : 1;
  const newGuitar = { id: newId, name, brand, price };
  guitars.push(newGuitar);
  return res.json({ message: 'Guitar created', guitar: newGuitar });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
