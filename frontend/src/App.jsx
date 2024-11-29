import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:2000/data";

function App() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);

  const fetchEntries = async () => {
    const response = await axios.get(API_URL);
    setEntries(response.data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }
    setFormData({ name: "", description: "" });
    setEditId(null);
    fetchEntries();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEntries();
  };

  const handleEdit = (entry) => {
    setFormData({ name: entry.name, description: entry.description });
    setEditId(entry.id);
  };

  return (
    <div className="container">
      <h1>To-do-Liste</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Inhalt"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        ></textarea>
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <h2>{entry.name}</h2>
            <p>{entry.description}</p>
            <button onClick={() => handleEdit(entry)}>Edit</button>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
