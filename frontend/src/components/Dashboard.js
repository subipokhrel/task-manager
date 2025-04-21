import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]); // State to store the list of all tasks
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Not Started",
  }); // For new task inputs
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };
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
      setNewTask({ title: "", description: "", status: "Not Started" }); // Clear form
      fetchTasks(); // Reload task list
    } catch (err) {
      alert("Failed to add task.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        withCredentials: true,
      });
      fetchTasks(); // Refresh task list
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      await axios.put(
        `http://localhost:5000/tasks/${id}`,
        { ...taskToUpdate, status: newStatus },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/"); // Redirect to login page
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      alert("Logout failed.");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUser();
  }, []);

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <div className="dashboard-header">
          <h1>
            <span style={{ color: "#0daec8" }}>
              Hello {user ? user.username : "User"}
            </span>
          </h1>
            <img
              src={require("../assets/sign-out.png")}
              alt="Logout"
              onClick={handleLogout}
              className="logout-icon"
            />
        </div>
        <form className="task-form" onSubmit={handleAdd}>
          <input
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            rows="1"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="table-with-icons">
          <table className="task-table">
            <thead>
              <tr>
                <th className="sno-col">S No.</th>
                <th className="title-col">Title</th>
                <th className="description-col">Description</th>
                <th className="status-col">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                    >
                      <option>Not Started</option>
                      <option>In Progress</option>
                      <option>Done</option>
                      <option>Deferred</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="delete-icons">
            {tasks.map((task) => (
              <button
                key={task.id}
                className="delete-icon"
                onClick={() => handleDelete(task.id)}
                title={`Delete task: ${task.title}`}
              >
                🗑️
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
