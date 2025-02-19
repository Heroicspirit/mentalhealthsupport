import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";
import flower from "../assets/flower.jpg"; // Flower image

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({
    date: "",
    time: "",
    duration: "30 minutes",
    problem: "Depression",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:5000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleUpdate = () => {
    console.log("Update appointment:", selectedAppointment);
  };

  const handleClear = () => {
    setSelectedAppointment({ date: "", time: "", duration: "30 minutes", problem: "Depression" });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminlogin");
  };

  return (
    <div
      className="admin-container"
      style={{ backgroundImage: `url(${flower})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <nav className="admin-nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </nav>

      <div className="admin-content">
        <h2>Appointment List</h2>
        <div className="appointment-form">
          <label>Date:</label>
          <input type="date" value={selectedAppointment.date} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, date: e.target.value })} />

          <label>Time:</label>
          <input type="time" value={selectedAppointment.time} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, time: e.target.value })} />

          <label>Problem:</label>
          <select value={selectedAppointment.problem} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, problem: e.target.value })}>
            <option value="Stress">Stress</option>
            <option value="Depression">Depression</option>
            <option value="Anxiety">Anxiety</option>
          </select>

          <label>Duration:</label>
          <select value={selectedAppointment.duration} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, duration: e.target.value })}>
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
          </select>

          <button onClick={handleUpdate}>Update Patient</button>
          <button onClick={handleClear}>Clear Form</button>
        </div>

        <h2>Patient List</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Problem</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.duration}</td>
                <td>{appointment.problem}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
