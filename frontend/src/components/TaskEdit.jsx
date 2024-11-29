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
      onUpdateTask(task); // Aufgabe aktualisieren
    }
  };

    return (
        <div>
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Old Task:
                        <input
                            type="text"
                            value={oldTask}
                            onChange={(e) => setOldTask(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        New Task:
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Update Task</button>
            </form>
            {message && <p>{message}</p>} {/* Display success/error message */}
        </div>
    );
};

export default TaskEdit;
