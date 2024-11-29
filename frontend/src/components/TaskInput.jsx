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
    <div>
      <h2>Neue Aufgabe hinzufügen</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Neue Aufgabe eingeben"
        />
        <button type="submit">Aufgabe hinzufügen</button>
      </form>
    </div>
  );
};

export default TaskInput;
