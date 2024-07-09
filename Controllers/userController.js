const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.registerUser = async (data) => {
  try {
    console.log(data);
    let existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    if (data.password !== data.confirmPassword) {
      return { error: "Passwords do not match" };
    }

    const user = new User({
      email: data.email,
      password: data.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(data.password, salt);

    const savedUser = await user.save();
    return { user: savedUser };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Internal server error' };
  }
};

exports.loginUser = async (data) => {
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return { error: 'User not found' };
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      return { error: 'Invalid credentials' };
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token, message: 'Logged in successfully', user };
  } catch (error) {
    console.error('Error logging in user:', error);
    return { error: 'Internal server error' };
  }
};
