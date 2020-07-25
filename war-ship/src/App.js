import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from './components/grid';
import './App.css';

const init = async () => {
  return await axios.get('/api/start/10');
};

function App() {
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    init().then(resp => {
      console.log('grid from server', resp.data)
      setGrid(resp.data.grid);
      gridDim = grid.length;
    });
  }, []);

  let gridDim = 0;

  return (
    <div className="App">
      <Grid gridSize={gridDim} grid={grid} />
    </div>
  );
}

export default App;
