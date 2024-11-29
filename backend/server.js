const express = require('express');
const path = require('path');
const app = express();
const PORT = 2000;
const cors = require('cors'); // CORS, damit Frontend auf API zugreifen kann
const fs = require('fs')

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "..", 'frontend', 'index.html');
  res.sendFile(filePath);
});

//Cors for connection between front and backend
app.use(cors());
app.use(express.json()); // Middleware zum Parsen von JSON-Dateien

//Path to JSON file
const filePath = path.join(__dirname, 'tasks.json');

//Read tasks from JSON fike
const readTasks = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

//Write to JSON file
const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

//Abrufen von tasks
app.get('/api/tasks', (req, res) => {
  const { todo, done } = readTasks();
  res.json({ todo, done });
});

//Task zu TODO hinzufuegen
app.post('/api/todo', (req, res) => {
    const { task } = req.body; // Task from request body
    if (task) {
        const tasks = readTasks();
        tasks.todo.push(task);
        writeTasks(tasks); // Save updated tasks to the JSON file
        res.status(201).json({ message: 'Task added', task });
    } else {
        res.status(400).json({ message: 'Invalid input' });
    }
});

//TODO task bearbeiten
app.put('/api/todo/edit', (req, res) => {
    const { oldTask, newTask } = req.body; // Old and new task from request body
    const tasks = readTasks();
    const index = tasks.todo.indexOf(oldTask);
    if (index !== -1 && newTask) {
        tasks.todo[index] = newTask; // Update task
        writeTasks(tasks); // Save updated tasks to the JSON file
        res.json({ message: 'Task updated', task: newTask });
    } else {
        res.status(404).json({ message: 'Task not found or invalid input' });
    }
});


//Task zu done schieben
app.put('/api/tasks/move', (req, res) => {
    const { task } = req.body; // Task from request body
    const tasks = readTasks();
    const index = tasks.todo.indexOf(task);
    if (index !== -1) {
        tasks.todo.splice(index, 1); // Remove from TODO
        tasks.done.push(task);        // Add to DONE
        writeTasks(tasks); // Save updated tasks to the JSON file
        res.json({ message: 'Task moved', task });
    } else {
        res.status(404).json({ message: 'Task not found in TODO' });
    }
});

//Alle Einträge löschen
app.delete('/api/tasks', (req, res) => {
    const tasks = { todo: [], done: [] }; // Reset tasks
    writeTasks(tasks); // Save empty tasks to the JSON file
    res.json({ message: 'All tasks deleted' });
});

app.listen(PORT, () => {
  console.log(`Der Server läuft auf http://localhost:${PORT}`);
});
