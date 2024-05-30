const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // * If email exists
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res
        .status(400)
        .json({ error: 'User already exists with the given email' });
    }

    // * Hash Password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // * Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ error: 'Please provide required fields ex: email & password' });
    }

    // * Check if email matches or not
    const isEmailMatch = await User.findOne({ email });

    if (!isEmailMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // * Check if password matches or not
    const isPasswordMatch = await bcryptjs.compare(
      password,
      isEmailMatch.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: isEmailMatch.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ user: isEmailMatch, token });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
