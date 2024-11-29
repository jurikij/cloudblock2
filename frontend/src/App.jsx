// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskEdit from "./components/TaskEdit";

const API_URL = "http://localhost:2000/api";

function App() {
  const [todo, setTodo] = useState([]); // Aufgaben in TODO
  const [done, setDone] = useState([]); // Aufgaben in DONE
  const [taskToEdit, setTaskToEdit] = useState(""); // Aufgabe zum Bearbeiten

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    setTodo(response.data.todo);
    setDone(response.data.done);
  };

  const addTask = async (task) => {
    await axios.post(`${API_URL}/todo`, { task });
    fetchTasks(); // Aufgaben nach dem Hinzufügen neu laden
  };

  const moveTaskToDone = async (task) => {
    await axios.put(`${API_URL}/tasks/move`, { task });
    fetchTasks(); // Aufgaben nach dem Verschieben neu laden
  };

  const updateTask = async (updatedTask) => {
    await axios.put(`${API_URL}/tasks/move`, { task: updatedTask });
    setTaskToEdit(""); // Bearbeitungsmodus verlassen
    fetchTasks(); // Aufgaben nach dem Update neu laden
  };

  return (
    <div>
      <h1>To-do-Liste</h1>

      {/* Eingabemaske */}
      <TaskInput onAddTask={addTask} />

      {/* Liste der gespeicherten Aufgaben */}
      <TaskList todo={todo} onMoveToDone={moveTaskToDone} />

      {/* Bearbeitungsformular */}
      {taskToEdit && (
        <TaskEdit taskToEdit={taskToEdit} onUpdateTask={updateTask} />
      )}

      {/* DONE-Liste */}
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
