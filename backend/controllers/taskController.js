// Import the Task model to interact with the tasks table in the database
const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  // Find all tasks that belong to the currently authenticated user
  const tasks = await Task.findAll({
   where: { userId: req.user.id }, // `req.user.id` comes from the decoded JWT (via middleware)
  });
  // Send the list of tasks back to the frontend as JSON
  res.json(tasks);
};

exports.addTask = async (req, res) => {
  try{
    console.log("req.user:", req.user); //for debugging
    // Destructure title and description from the request body
    const { title, description } = req.body;
    // Create a new task entry in the database, linked to the logged-in user
    const task = await Task.create({ 
      title, 
      description, 
      userId: req.user.id, // Link task to the current user
    });
    // Return the created task with 201 Created status
    res.status(201).json(task);
  } catch (error) {
    console.error("Error while creating task:", error); 
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  // Get the task ID from the route parameter
  const taskId = req.params.id;

  // Delete the task only if it belongs to the logged-in user
  await Task.destroy({ 
    where: {
      id: taskId, 
      userId: req.user.id, // Ensures users can only delete their own tasks
    },
  });

  // Respond with a message after deletion
  res.json({ message: 'Task deleted' });
};