import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

// A SECRET KEY for signing JWT tokens (keep it secret in production!)
const JWT_SECRET = 'mysecretkey';

// Mock user data (for demonstration only)
const users = [
  { email: 'admin@admin.com', password: 'admin', role: 'admin' },
  { email: 'user@user.com',   password: 'user',  role: 'user' }
];

// In-memory guitars
const guitars = [
  { id: 1, name: 'Stratocaster', brand: 'Fender', price: 999 },
  { id: 2, name: 'Les Paul', brand: 'Gibson', price: 1299 },
  { id: 3, name: 'SG', brand: 'Gibson', price: 1199 },
  { id: 4, name: 'Telecaster', brand: 'Fender', price: 899 },
];

// Initialize Express app
const app = express();
app.use(cors()); // allow cross-origin requests
app.use(bodyParser.json()); // parse JSON in request body

// ------------------------------
// AUTH MIDDLEWARE
// ------------------------------
function verifyToken(req, res, next) {
  // The token typically comes in 'Authorization' header as: Bearer <token>
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }
  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  // Verify token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    // Attach decoded user data to request
    req.user = decoded;
    next();
  });
}

// ------------------------------
// ROUTES
// ------------------------------
/** 
 * POST /api/login 
 * Body: { email: string, password: string }
 * Returns: { token: string }
 */
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists in the mock array
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create a JWT
  const token = jwt.sign(
    { email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' } // token valid for 1 hour
  );

  return res.json({ token });
});

/**
 * GET /api/guitars
 * Public endpoint, returns an array of guitars
 */
app.get('/api/guitars', (req, res) => {
  return res.json(guitars);
});

/**
 * GET /api/admin
 * Protected endpoint (must have a valid token & be 'admin' role)
 */
app.get('/api/admin', verifyToken, (req, res) => {
  // Check role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin only' });
  }
  // Return some admin data
  return res.json({ secretAdminData: 'Welcome, Admin!' });
});

// ------------------------------
// START SERVER
// ------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
