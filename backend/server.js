const express = require("express");
const path = require("path");
const app = express();
const PORT = 2000;
const cors = require("cors"); //CORS damit Frontend auf API zugreifen kann

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "..", "frontend", "index.html");
  res.sendFile(filePath);
});

app.use(cors());
app.use(express.json()); //Middleware zum parsen von JSON-Dateien

let todo = [];
let done = [];

app.get("api/tasks", (req, res) => {
  res.json({ todo, done });
});

// POST-Endpunkt: Aufgabe zu TODO hinzufügen
app.post("/api/todo", (req, res) => {
  const task = req.body.task; // Aufgabe aus dem Request-Body
  if (task) {
    todo.push(task);
    res.status(201).json({ message: "Aufgabe hinzugefügt", task });
  } else {
    res.status(400).json({ message: "Ungültige Eingabe" });
  }
});

// POST-Endpunkt: Aufgabe zu DONE hinzufügen
app.post("/api/done", (req, res) => {
  const task = req.body.task; // Aufgabe aus dem Request-Body
  if (task) {
    done.push(task);
    res.status(201).json({ message: "Aufgabe abgeschlossen", task });
  } else {
    res.status(400).json({ message: "Ungültige Eingabe" });
  }
});

// PUT-Endpunkt: Aufgabe von TODO nach DONE verschieben
app.put("/api/tasks/move", (req, res) => {
  const { task } = req.body; // Aufgabe aus dem Request-Body
  const index = todo.indexOf(task);
  if (index !== -1) {
    todo.splice(index, 1); // Entferne aus TODO
    done.push(task); // Füge zu DONE hinzu
    res.json({ message: "Aufgabe verschoben", task });
  } else {
    res.status(404).json({ message: "Aufgabe nicht gefunden in TODO" });
  }
});

app.listen(PORT, () => {
  console.log("The server is running on http://localhost:${PORT}");
});
