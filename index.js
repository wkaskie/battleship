const http = require('http');

const gameBoard = [];
const numberOfPieces = 6;
const sizeOfPieces = 3;
const baseUrl = 'http://localhost:3030';

const startPlaying = () => {
    let playCount = 0;
    const gameInterval = setInterval(() => {
        playCount++;
        const x = Math.floor(Math.random() * 9);
        const y = Math.floor(Math.random() * 9)
        http.get(`${baseUrl}/attack/${x}/${y}`, response => {
            let fullResponse = '';
            response.on('data', dataChunk => {
                fullResponse += dataChunk;
            }).on('end', () => console.log(fullResponse));
        });
        if (playCount === 10) { clearInterval(gameInterval); }
    }, 100);
}

const init = (gridSize = 10) => {
    const url = baseUrl + '/start/' + gridSize;
    http.get(url, res => {
        let fullResp = '';
        res.on('data', dataChunk => fullResp += dataChunk)
           .on('end', () => console.log(fullResp))
        startPlaying();
    });
}

// for demo, wait for server to start
setTimeout(() => init(10), 2000);

