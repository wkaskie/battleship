import React, { useState } from 'react';
import './grid.scss';

export const Grid = () => {
    const gridDim = 10;
    const gridArray = Array.from(new Array(10)).map(() => new Array(10).fill('X'));
    console.log(gridArray);
    return (
        <div className="gridContainer">
            {gridArray.map((row, rowNum) => (
                <div className="gridRow" key={rowNum}>
                    {row.map((val, colNum) => (
                        <div className="gridBlock" key={colNum}>
                            {val}
                        </div>
                    ))}
                </div>
            ))
            }
        </div>
    )
}