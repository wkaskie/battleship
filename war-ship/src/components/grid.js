import React, { useState, useEffect } from 'react';
import './grid.scss';

export const Grid = ({grid}) => {
    const [gridArray, setGridArray] = useState([]); // Array.from(new Array(10)).map(() => new Array(10).fill('X'));
    useEffect(() => {
        setGridArray(grid);
    }, [grid]);

    console.log(gridArray);

    return (
        <div className="Grid">
            {gridArray?.map((row, rowNum) => (
                <div className="Grid__row" key={rowNum}>
                    {row.map((val, colNum) => (
                        <div className="Grid__block" key={colNum}>
                            {val}
                        </div>
                    ))}
                </div>
            ))
            }
        </div>
    )
}