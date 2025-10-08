import React from "react";
import { Square } from "./Square";

type BoardProps = {
  squares: (string | null)[];
  onClick: (i: number) => void;
  winningLine?: number[] | null;
};

export const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
    function renderSquare(i: number) {
        const isWinning = winningLine?.includes(i) ?? false;
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
                highlight={isWinning}
            />
        );
    }

    return (
        <div className="board">
            {[0, 1, 2].map((row) => (
                <div key={row} className="board-row">
                    {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
                </div>
            ))}
        </div>
    );
};
