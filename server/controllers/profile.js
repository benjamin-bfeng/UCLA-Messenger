const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');
const auth = require('../auth');

router.get('/me', auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error Fetching user' });
  }
});



router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error Fetching user' });
  }
});
module.exports = router;
