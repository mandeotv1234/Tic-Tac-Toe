import React, { useState } from "react";
import { Board } from "../components/Board";

type HistoryItem = {
  squares: (string | null)[];
  moveLoc: string | null;
};

function calculateWinner(squares: (string | null)[]): { winner: string; line: number[] } | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a]!, line };
    }
  }
  return null;
}

function getLocation(index: number): string {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return `(${row}, ${col})`;
}

export const Game: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { squares: Array(9).fill(null), moveLoc: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascOrder, setAscOrder] = useState(true);

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line;

  let moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} ${step.moveLoc ? `at ${step.moveLoc}` : ""}`
      : "Go to game start";
    if (move === stepNumber) {
      return (
        <li key={move}>
          <span className="font-bold">
            You are at move #{move} {step.moveLoc ? `at ${step.moveLoc}` : ""}
          </span>
        </li>
      );
    }
    return (
      <li key={move}>
        <button className="underline text-blue-600" onClick={() => setStepNumber(move)}>
          {desc}
        </button>
      </li>
    );
  });

  if (!ascOrder) moves = [...moves].reverse();

  function handleClick(i: number) {
    const historyUpToStep = history.slice(0, stepNumber + 1);
    const currentSquares = current.squares.slice();
    if (winner || currentSquares[i]) return;
    currentSquares[i] = xIsNext ? "X" : "O";
    setHistory(historyUpToStep.concat([{ squares: currentSquares, moveLoc: getLocation(i) }]));
    setStepNumber(historyUpToStep.length);
    setXIsNext(!xIsNext);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (current.squares.every(Boolean)) {
    status = "Draw! No winner.";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div>
        <Board squares={current.squares} onClick={handleClick} winningLine={winningLine} />
      </div>
      <div className="mt-4">{status}</div>
      <button
        className="mt-2 px-4 py-2 bg-gray-200 rounded"
        onClick={() => setAscOrder(!ascOrder)}
      >
        Sort {ascOrder ? "Descending" : "Ascending"}
      </button>
      <ol className="mt-4">{moves}</ol>
    </div>
  );
};