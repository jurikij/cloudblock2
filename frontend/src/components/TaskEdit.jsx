// src/components/TaskEdit.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios'

const TaskEdit = () => {
  const [oldTask, setOldTask] = useState('');
  const [newTask, setNewTask] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:2000/api/todo/edit', {
        oldTask,
        newTask,
      });
      setMessage(response.data.message);
      } catch(error) {
        if(error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An error occured while updating the task');
        }
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
