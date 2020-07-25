const express = require('express');
const path = require('path');
const app = express();
const port = 3030;
const { init, checkHit } = require('./game');

// Middleware time!
app.use(express.static('build'));
app.use(express.static('public'));

app.get('/api', (req, res) => {
    res.send('hello');
});

app.get('/api/start/:gridSize', (req, res) => {
    const { gridSize } = req.params;
    const newGrid = init();
    res.send({message: `Starting game on a ${gridSize} by ${gridSize} grid`, grid: newGrid});
});

app.get('/api/attack/:xCord/:yCord', (req, res) => {
    const { xCord, yCord} = req.params;
    // console.log('Checking: ', xCord, yCord);
    res.send(checkHit(xCord, yCord));
});

app.listen(port, () => console.log(`Server running on localhost:${port}`));