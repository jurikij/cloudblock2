import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:2000/api";

function App() {
  const [todo, setTodo] = useState([]); // Aufgaben in TODO
  const [done, setDone] = useState([]); // Aufgaben in DONE
  const [task, setTask] = useState(""); // Eingabewert für die Aufgabe

  // Aufgaben beim Laden der Seite abrufen
  useEffect(() => {
    fetchTasks();
  }, []);

  // Aufgaben von der API abrufen
  const fetchTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    setTodo(response.data.todo);
    setDone(response.data.done);
  };

  // Aufgabe zu TODO hinzufügen
  const addTask = async () => {
    if (task) {
      await axios.post(`${API_URL}/todo`, { task });
      setTask("");
      fetchTasks(); // Aufgaben nach dem Hinzufügen neu laden
    }
  };

  // Aufgabe von TODO nach DONE verschieben
  const moveTaskToDone = async (task) => {
    await axios.put(`${API_URL}/tasks/move`, { task });
    fetchTasks(); // Aufgaben nach dem Verschieben neu laden
  };

  return (
    <div>
      <h1>To-do-Liste</h1>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Neue Aufgabe eingeben"
      />
      <button onClick={addTask}>Aufgabe hinzufügen</button>

      <h2>TODO</h2>
      <ul>
        {todo.map((t, index) => (
          <li key={index}>
            {t}
            <button onClick={() => moveTaskToDone(t)}>
              Verschieben nach DONE
            </button>
          </li>
        ))}
      </ul>

      <h2>DONE</h2>
      <ul>
        {done.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
