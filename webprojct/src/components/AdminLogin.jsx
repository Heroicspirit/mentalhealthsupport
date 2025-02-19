import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import splashjpg from "../assets/splash.jpg"; // Correct path to splash.jpg
import "./AdminLogin.css";

const AdminLogin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email: login,
        password: password,
      });

      localStorage.setItem("adminToken", response.data.token); // Store token
      console.log("Login successful!");
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <nav className="admin-nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <div 
        className="admin-login-page" 
        style={{ 
          backgroundImage: `url(${splashjpg})`,
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h2 className="admin-welcome">Welcome, We hope you have a good day!</h2>

        <div className="admin-login-container">
          <form onSubmit={handleSubmit}>
            <label>Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>

            {error && <p className="error-message">{error}</p>} {/* Show error message */}
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
