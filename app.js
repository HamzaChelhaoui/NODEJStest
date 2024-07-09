const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();


app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at Port "${port}"`);
});
