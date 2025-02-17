import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Journal.css";

const Journal = () => {
  const navigate = useNavigate();
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    date: "",
    mood: 7,
    title: "",
    content: "",
    symptoms: [],
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/journals", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEntries(response.data);
      })
      .catch(() => {
        toast.error("Failed to fetch journal entries. Please try again.");
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const symptoms = checked
        ? [...currentEntry.symptoms, name]
        : currentEntry.symptoms.filter((symptom) => symptom !== name);
      setCurrentEntry((prev) => ({ ...prev, symptoms }));
    } else if (type === "range") {
      setCurrentEntry((prev) => ({ ...prev, [name]: Number.parseInt(value, 10) }));
    } else {
      setCurrentEntry((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateDate = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDate(currentEntry.date)) {
      toast.error("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    const entryData = {
      date: currentEntry.date,
      mood: currentEntry.mood,
      title: currentEntry.title,
      symptoms: currentEntry.symptoms,
      entry: currentEntry.content,
    };

    if (editingId) {
      axios
        .put(`http://localhost:5000/api/journals/${editingId}`, entryData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setEntries((prevEntries) =>
            prevEntries.map((entry) =>
              entry.id === editingId ? { ...entry, ...entryData } : entry
            )
          );
          setEditingId(null);
          setShowNewEntry(false);
          toast.success("Journal entry updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update journal entry. Please try again.");
        });
    } else {
      axios
        .post("http://localhost:5000/api/journals", entryData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setEntries([...entries, response.data]);
          setShowNewEntry(false);
          toast.success("Journal entry saved successfully!");
        })
        .catch(() => {
          toast.error("Failed to save journal entry. Please try again.");
        });
    }

    setCurrentEntry({
      date: "",
      mood: 7,
      title: "",
      content: "",
      symptoms: [],
    });
  };

  const handleEdit = (entry) => {
    setCurrentEntry({
      date: entry.date,
      mood: entry.mood,
      title: entry.title,
      content: entry.entry,
      symptoms: entry.symptoms,
    });
    setEditingId(entry.id);
    setShowNewEntry(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/journals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEntries(entries.filter((entry) => entry.id !== id));
        toast.success("Journal entry deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete journal entry. Please try again.");
      });
  };

  return (
    <div className="journal-page">
      <ToastContainer />
      <nav className="navbar">
        <div className="left-nav">
          <a href="/">Home</a>
          <a href="/about">About us</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="right-nav">
          <a href="#" onClick={(e) => e.preventDefault() || navigate("/appointments")}>
            Appointments
          </a>
          <a href="#" className="active">
            Journal
          </a>
        </div>
      </nav>

      <div className="journal-container">
        <div className="main-content">
          <div className="header-section">
            <h1>User Mental Health</h1>
            <button
              className="new-entry-btn"
              onClick={() => {
                setShowNewEntry(!showNewEntry);
                if (!showNewEntry) {
                  setEditingId(null);
                  setCurrentEntry({
                    date: "",
                    mood: 7,
                    title: "",
                    content: "",
                    symptoms: [],
                  });
                }
              }}
            >
              {showNewEntry ? "- Close Entry" : "+ New Entry"}
            </button>
          </div>

          {showNewEntry && (
            <form className="entry-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={currentEntry.date} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Mood Scale (1-10)</label>
                <div className="mood-scale">
                  <input type="range" name="mood" min="1" max="10" value={currentEntry.mood} onChange={handleInputChange} />
                  <span>{currentEntry.mood}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={currentEntry.title} onChange={handleInputChange} required />
              </div>

              <div className="form-group symptoms">
                <label>Symptoms</label>
                <div className="symptoms-grid">
                  {["Anxiety", "Depression", "Insomnia", "Stress"].map((symptom) => (
                    <label key={symptom} className="symptom-checkbox">
                      <input type="checkbox" name={symptom} checked={currentEntry.symptoms.includes(symptom)} onChange={handleInputChange} />
                      {symptom}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="content">Journal Entry</label>
                <textarea id="content" name="content" value={currentEntry.content} onChange={handleInputChange} required rows="6"></textarea>
              </div>

              <button type="submit" className="save-btn">
                {editingId ? "Update Entry" : "Save Entry"}
              </button>
            </form>
          )}

          <div className="entries-list">
            {entries.map((entry) => (
              <div key={entry.id} className="entry-card">
                <h3>{entry.title}</h3>
                <p><strong>Date:</strong> {entry.date.split('T')[0]}</p>
                <p><strong>Mood:</strong> {entry.mood}</p>
                <p><strong>Symptoms:</strong> {entry.symptoms.join(", ")}</p>
                <p>{entry.entry}</p>
                <div className="entry-actions">
                  <button onClick={() => handleEdit(entry)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(entry.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
