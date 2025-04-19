import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // State to store the list of all tasks
  const [newTask, setNewTask] = useState({ title: "", description: "" }); // For new task inputs

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks", {
        withCredentials: true,
      });
      setTasks(res.data); // Save the tasks to state
    } catch (err) {
      alert("Failed to load tasks.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/tasks", newTask, {
        withCredentials: true,
      });
      setNewTask({ title: "", description: "" }); // Clear form
      fetchTasks(); // Reload task list
    } catch (err) {
      alert("Failed to add task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        withCredentials: true,
      });
      fetchTasks(); // Reload tasks after deletion
    } catch (err) {
      alert("Delete failed.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task Manager</h2>

      <form onSubmit={handleAdd}>
        <input
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
