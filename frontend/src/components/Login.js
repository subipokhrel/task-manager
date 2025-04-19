import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setIsAuthenticated } = useContext(AuthContext);   // From AuthContext, this lets us update global "isAuthenticated" value
  const navigate = useNavigate();

    // Runs when user types in any input field
  const handleChange = (e) =>
    setForm({ 
        ...form, // Keep other fields unchanged
        [e.target.name]: e.target.value // Update only the one that was typed
    });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing on submit
    try {
    // Send login request to backend with form data
      await axios.post("http://localhost:5000/login", form, {
        withCredentials: true, // send cookies (includes token)
      });
      setIsAuthenticated(true); // If login is successful, update global login state
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redirect to signup page
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
      <button type="button" onClick={handleRegisterClick}>
        Register
      </button>
    </form>
  );
};

export default Login;
