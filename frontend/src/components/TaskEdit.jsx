// src/components/TaskEdit.jsx
import React, { useState, useEffect } from "react";

const EditTask = () => {
    const [oldTask, setOldTask] = useState('');
    const [newTask, setNewTask] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('http://localhost:3000/api/todo/edit', {
                oldTask,
                newTask,
            });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message); // Display error message from server
            } else {
                setMessage('An error occurred while updating the task.');
            }
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
