import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import splashjpg from "../assets/splash.jpg"; // Correct path to splash.jpg
import "./AdminLogin.css";

const AdminLogin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Login:", login, "Password:", password);
    // Add authentication logic here
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
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
