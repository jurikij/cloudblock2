const express = require('express');
const path = require('path');
const app = exoress();
const PORT = 2000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log('The server is running on http://localhost>${PORT}');
});
