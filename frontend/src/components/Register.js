import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate helps redirect user after registration
import "../styles/Auth.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // This function runs every time an input field changes
  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading
    try {
      await axios.post("http://localhost:5000/register", form); // Send the form data to backend API (POST /register)
      alert("Registration successful!");
      navigate("/"); //To login page
    } catch (err) {
      // Log the raw Axios error
      console.error("Registration error (full):", err);

      // If the server sent a JSON error message, log that too
      if (err.response?.data) {
        console.error("Server response data:", err.response.data);
      }

      // Show the user something more informative
      const msg = err.response?.data?.error || err.message || "Unknown error";
      alert("Registration failed: " + msg);
    }
  };
  const handleLoginRedirect = () => {
    navigate("/"); // Navigate to login
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
      <button
        type="button"
        onClick={handleLoginRedirect}
        style={{ marginTop: "10px" }}
      >
        Already have an account?
      </button>
    </form>
  );
};

export default Register;
