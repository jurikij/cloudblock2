// src/components/TaskEdit.jsx
import React, { useState, useEffect } from "react";

const TaskEdit = ({ taskToEdit, onUpdateTask }) => {
  const [task, setTask] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onUpdateTask(setTask); // Aufgabe aktualisieren
    }
  };

  return (
    <div>
      <h2>Aufgabe bearbeiten</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Aufgabe bearbeiten"
        />
        <button type="submit">Speichern</button>
      </form>
    </div>
  );
};

export default TaskEdit;
