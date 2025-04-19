// Import
const express = require('express');
// Create a router instance
const router = express.Router();
// Import task-related controller functions
const { getTasks, addTask, deleteTask } = require('../controllers/taskController');
// Import the auth middleware to protect routes
const auth = require('../middleware/authMiddleware');

// Define GET /tasks - fetch all tasks for logged-in user
router.get('/tasks', auth, getTasks);
// Define POST /tasks - add a new task for logged-in user
router.post('/tasks', auth, addTask);
// Define DELETE /tasks/:id - delete a task by ID (only if user owns it)
router.delete('/tasks/:id', auth, deleteTask);

// Export the router so it can be used in index.js
module.exports = router;
