const express = require('express');
const app = express();
const port = 3030;
const { init, checkHit } = require('./game');

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/start/:gridSize', (req, res) => {
    const { gridSize } = req.params;
    init();
    res.send(`Starting game on a ${gridSize} by ${gridSize} grid`);
});

app.get('/attack/:xCord/:yCord', (req, res) => {
    const { xCord, yCord} = req.params;
    // console.log('Checking: ', xCord, yCord);
    res.send(checkHit(xCord, yCord));
});

app.listen(port, () => console.log(`Server running on localhost:${port}`));