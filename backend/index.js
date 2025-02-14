const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
    res.send('Hello World from Node.js!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});