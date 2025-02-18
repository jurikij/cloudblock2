// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskEdit from "./components/TaskEdit";
import pic from "./to-do-list.png";

const API_URL = "http://localhost:2000/api";

function App() {
  const [todo, setTodo] = useState([]); // Aufgaben in TODO
  const [done, setDone] = useState([]); // Aufgaben in DONE
  const [taskToEdit, setTaskToEdit] = useState(""); // Aufgabe zum Bearbeiten

  // Aufgaben beim Laden der Seite abrufen
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTodo(response.data.todo);
      setDone(response.data.done);
    } catch (error) {
      console.error("Fehler beim Laden der Aufgaben:", error);
    }
  };

  const addTask = async (task) => {
    await axios.post(`${API_URL}/todo`, { task });
    fetchTasks(); // Aufgaben nach dem Hinzufügen neu laden
  };

  const moveTaskToDone = async (task) => {
    await axios.put(`${API_URL}/tasks/move`, { task });
    fetchTasks(); // Aufgaben nach dem Verschieben neu laden
  };

  // Aufgabe bearbeiten
  const updateTask = async (oldTask, newTask) => {
    await axios.post(`${API_URL}/todo/edit`, { oldTask, newTask });
    fetchTasks(); // Aufgaben nach dem Update neu laden
  };

  const handleTaskEditSubmit = (editedTask) => {
    updateTask(taskToEdit, editedTask); // Aufgabe bearbeiten und mit neuem Text absenden
    setTaskToEdit(""); // Bearbeitungsmodus verlassen
  };

  const handleDeleteAllTasks = async () => {
    await axios.delete(`${API_URL}/tasks`);
    fetchTasks(); // Alle Aufgaben nach dem Löschen neu laden
  };

  return (
    <div>
      <nav
        class="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={pic} alt="Logo" class="d-inline-block align-text-top" />
            TodoLists
          </a>
        </div>
      </nav>
      <h1 className="überschrift">To-do-Liste</h1>
      <div />
      {/* Eingabemaske */}
      <TaskInput onAddTask={addTask} />
      <TaskList
        todo={todo}
        onMoveToDone={moveTaskToDone}
        setTaskToEdit={setTaskToEdit} // Übergebe setTaskToEdit an TaskList
      />

      {/* Bearbeitungsformular */}
      {taskToEdit && (
        <TaskEdit
          taskToEdit={taskToEdit}
          onTaskEditSubmit={handleTaskEditSubmit}
        />
      )}
      <div className="container">
        <h2>DONE</h2>
        <ul>
          {done.map((t, index) => (
            <li key={index}>{t}</li>
          ))}
        </ul>
      </div>
      {/* Button zum Löschen aller Aufgaben */}
      <button onClick={handleDeleteAllTasks} className="container">
        Alle Aufgaben löschen
      </button>
    </div>
  );
}

export default App;
