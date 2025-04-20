const express = require('express');
const app = express();
// Import the database connection (Sequelize instance)
const sequelize = require('./models/index');
// Middleware to parse cookies
const cookieParser = require('cookie-parser');
// Enable Cross-Origin Resource Sharing
const cors = require('cors');
// Load environment variables from .env file
require('dotenv').config();

// Enable JSON parsing for request bodies (for POST/PUT requests)
app.use(express.json());
// Enable cookie parsing (to read JWT from cookies)
app.use(cookieParser());
// Enable CORS to allow requests from frontend
app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  credentials: true // Allow cookies to be sent with requests
}));

app.use('/', require('./routes/authRoutes')); //for /register and /login
app.use('/', require('./routes/taskRoutes')); //for /tasks, /tasks/:id
app.use('/', require('./routes/userRoutes'));

// Sync models with the database, then start the server
sequelize.sync().then(() => {
  // Start server on the port defined in .env
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
