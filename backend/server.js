const express = require('express');
const path = require('path');
const app = express();
const PORT = 2000;

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', 'frontend', 'src', 'App.jsx');
    res.sendFile(filePath);
});

app.listen(PORT, () => {
    console.log('The server is running on http://localhost:${PORT}');
});
