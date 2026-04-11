import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { ensureAuthenticated } from '../middlewares/route-access.middleware.js';
const router = express.Router();

/**
 * @description Get all users
 * @route GET /api/users
 * @access Private
 * @returns {Object} - User object
 * @example
 * GET /api/users
 * {
 *  "users": [
 *    {
 *      "name": "John Doe",
 *      "email": "john.doe@example.com"
 *    }
 */
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error getting users', error);
    return res.status(500).json({ message: 'Failed to get users', error: error.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields: name, email, password' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, salt });

    return res.status(201).json({
      message: 'User created successfully',
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
    });
  } catch (error) {
    console.error('Error logging in', error);
    return res.status(500).json({ message: 'Failed to login' });
  }
});

export default router;
