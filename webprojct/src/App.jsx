import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Appointment from "./components/Appointment"; // Import the Appointment component
import Journal from "./components/Journal";
import AdminLogin from "./components/AdminLogin";
import Admin from "./components/Admin";
function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/appointments" element={<Appointment />} /> {/* Route to Appointment page */}
          <Route path="/journal" element={<Journal />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
