const express = require('express');
const router = express.Router();

const { register, login, getLoggedInUser } = require('../controllers/auth');
const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getLoggedInUser);

module.exports = router;
