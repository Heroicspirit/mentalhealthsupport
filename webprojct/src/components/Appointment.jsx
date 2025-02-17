import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Appointment.css";

console.log("Appointment component rendered");

const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    problem: "Depression",
    duration: "30 minutes",
    notes: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      const token = localStorage.getItem("token");
      if (!token) return;

      axios
        .get("/api/appointments", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const appointmentsData = Array.isArray(response.data) ? response.data : [];
          setAppointments(appointmentsData);
          localStorage.setItem("appointments", JSON.stringify(appointmentsData));
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error.response?.data || error.message);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { date, time, problem, duration, notes } = formData;
    if (!date || !time) return alert("Please select a date and time.");

    const token = localStorage.getItem("token");

    if (isEditing) {
      axios
        .put(`http://localhost:5000/api/appointments/${editId}`, { date, time, problem, duration, notes }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("API Response (Update):", response.data);
          const updatedAppointments = appointments.map(appt => appt.id === editId ? response.data : appt);
          setAppointments(updatedAppointments);
          localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
          setIsEditing(false);
          setEditId(null);
          setFormData({ date: "", time: "", problem: "Depression", duration: "30 minutes", notes: "" });
        })
        .catch((error) => {
          console.error("Error updating appointment:", error.response?.data || error.message);
          console.error("Status:", error.response?.status);
          console.error("Headers:", error.response?.headers);
        });
    } else {
      axios
        .post("http://localhost:5000/api/appointments", { date, time, problem, duration, notes }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("API Response (Create):", response.data);
          const updatedAppointments = [...appointments, response.data];
          setAppointments(updatedAppointments);
          localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
          setFormData({ date: "", time: "", problem: "Depression", duration: "30 minutes", notes: "" });
        })
        .catch((error) => {
          console.error("Error creating appointment:", error.response?.data || error.message);
          console.error("Status:", error.response?.status);
          console.error("Headers:", error.response?.headers);
        });
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/api/appointments/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        const updatedAppointments = appointments.filter((appt) => appt.id !== id);
        setAppointments(updatedAppointments);
        localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error.response?.data || error.message);
        console.error("Status:", error.response?.status);
        console.error("Headers:", error.response?.headers);
      });
  };

  return (
    <div>
      <nav>
        <div className="left-nav">
          <a href="/">Home</a>
          <a href="/#about">About us</a>
          <a href="/#contact">Contact</a>
        </div>
        <div className="right-nav">
          <a href="#" className="active">Appointments</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/journal"); }}>Journal</a>
        </div>
      </nav>

      <div className="container">
        <h2>Schedule Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" value={formData.date} onChange={handleInputChange} required />

          <label htmlFor="time">Time</label>
          <input type="time" id="time" value={formData.time} onChange={handleInputChange} required />

          <label htmlFor="problem">Problem</label>
          <select id="problem" value={formData.problem} onChange={handleInputChange}>
            <option value="Depression">Depression</option>
            <option value="Anxiety">Anxiety</option>
            <option value="Stress">Stress</option>
          </select>

          <label htmlFor="duration">Duration</label>
          <select id="duration" value={formData.duration} onChange={handleInputChange}>
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
          </select>

          <label htmlFor="notes">Appointment Notes</label>
          <textarea id="notes" value={formData.notes} onChange={handleInputChange} placeholder="Enter any additional notes..."></textarea>

          <button type="submit">{isEditing ? "Update Appointment" : "Schedule Appointment"}</button>
        </form>
      </div>

      <div className="appointments">
        <h3>Appointments</h3>
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
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.duration}</td>
                  <td>{appointment.problem}</td>
                  <td>
                    <button onClick={() => {
                      setIsEditing(true);
                      setEditId(appointment.id);
                      setFormData({
                        date: appointment.date.split("T")[0], // Extract date part
                        time: appointment.time,
                        problem: appointment.problem,
                        duration: appointment.duration,
                        notes: appointment.notes,
                      });
                    }}>Edit</button>
                    <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
