const express = require('express');
const { registerUser, loginUser } = require('../Controllers/userController');

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body);
  const result = await registerUser(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  res.status(201).json(result.user);
});

router.post('/login', async (req, res) => {
  const result = await loginUser(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  res.json(result);
});

module.exports = router;
