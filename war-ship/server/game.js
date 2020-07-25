let gameBoard = [];
let numberOfPieces = 6;
let sizeOfPieces = 3;
let gridDim = 10;

const setStartPoints = (gridSize = gridDim) => { // return the top of the vertical piece
    const randomCoords = Array.from(new Array(numberOfPieces), () => {
        return [Math.floor(Math.random() * (gridSize - (sizeOfPieces))), Math.floor(Math.random() * (gridSize))];
    });

    console.table(gameBoard);
    console.table(randomCoords);
    randomCoords.forEach((coord, indx) => {
        let row = coord[0];
        let col = coord[1] - 1; // the negative 1 is just to simnplify the while loop
        let locationSum = 9; // arbitrarily not 0

        // For Vertical pieces
        while (locationSum !== 0 && col < (gridSize -1 )) {
            col++;
            if (col === (gridSize)) { // we've exceeded the grid dims
                col = coord[1] - 1; // start over with the original coord
                row = row < (gridSize + sizeOfPieces) ?  row + 1 : 0 // but try another row
            }

            locationSum = gameBoard.slice(row, row + sizeOfPieces).reduce((sum, row) => row[col] + sum, 0);
            console.log(row, col, locationSum);
        }
        for (let r = row; r < row + sizeOfPieces; r++) {
            // console.log(`Setting ${r}, ${col} to ${indx + 1}`);
            gameBoard[r][col] = indx + 1;
        }
        // For horizontal pieces
        // while (locationSum !== 0 && row <= (gridSize - sizeOfPieces)) { // a piece is in our area
        //     row++;
        //     let targetCells = gameBoard[row].slice(col, col + sizeOfPieces);
        //     locationSum = targetCells.reduce((sum, val) => sum + val);
        // }
        // targetCells = Array.from({ length: sizeOfPieces }, (v, i) => indx + 1);
        // gameBoard[row].splice(col, col + sizeOfPieces - 1, ...targetCells);
    });

    console.table(gameBoard);
}

const init = (gridSize = gridDim) => {
    gameBoard = Array.from(new Array(gridSize)).map(() => Array.from(new Array(gridSize).fill(0)));
    setStartPoints();
    return gameBoard;
}

const checkHit = (xCord, yCord) => gameBoard[xCord][yCord] !== 0;

module.exports = {
    init,
    checkHit
};
