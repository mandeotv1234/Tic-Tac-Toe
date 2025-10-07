import React from "react";

type BoardProps = {
  squares: (string | null)[];
  onClick: (i: number) => void;
  winningLine?: number[] | null;
};

export const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  function renderSquare(i: number) {
    const isWinning = winningLine?.includes(i);
    return (
      <button
        key={i}
        className={`w-16 h-16 border text-2xl font-bold ${isWinning ? "bg-yellow-300" : "bg-white"}`}
        onClick={() => onClick(i)}
      >
        {squares[i]}
      </button>
    );
  }

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresRow = [];
    for (let col = 0; col < 3; col++) {
      squaresRow.push(renderSquare(row * 3 + col));
    }
    boardRows.push(
      <div key={row} className="flex">
        {squaresRow}
      </div>
    );
  }

  return <div>{boardRows}</div>;
};