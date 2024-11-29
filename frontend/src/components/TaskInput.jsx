import React, { useState } from "react";

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState(""); // Eingabewert für die Aufgabe

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onAddTask(task); // Aufgabe wird zum App-Level State hinzugefügt
      setTask(""); // Eingabefeld zurücksetzen
    }
  };

  return (
    <div className="container">
      <h2>Neue Aufgabe hinzufügen</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          className="input-group flex-nowrap"
          onChange={(e) => setTask(e.target.value)}
          placeholder="Aufgabe eingeben"
        />
        <button type="submit">Aufgabe hinzufügen</button>
      </form>
    </div>
  );
};

export default TaskInput;
