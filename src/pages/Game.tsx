import React, { useState } from "react";
import { Board } from "../components/Board";
import { MoveHistory } from "../components/MoveHistory";
import { Status } from "../components/Status";
import { calculateWinner } from "../utils/calculateWinner";
import { getLocation } from "../utils/getLocation";

type HistoryItem = {
  squares: (string | null)[];
  moveLoc: string | null;
};

export const Game: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { squares: Array(9).fill(null), moveLoc: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascOrder, setAscOrder] = useState(true);

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo?.winner ?? null;
  const winningLine = winnerInfo?.line ?? null;

  function handleClick(i: number) {
    const historyUpToStep = history.slice(0, stepNumber + 1);
    const currentSquares = current.squares.slice();
    if (winner || currentSquares[i]) return;

    currentSquares[i] = xIsNext ? "X" : "O";
    setHistory(historyUpToStep.concat([{ squares: currentSquares, moveLoc: getLocation(i) }]));
    setStepNumber(historyUpToStep.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move: number) {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <Board squares={current.squares} onClick={handleClick} winningLine={winningLine} />
      <Status winner={winner} nextPlayer={xIsNext ? "X" : "O"} squares={current.squares} />
      <MoveHistory
        history={history}
        stepNumber={stepNumber}
        ascOrder={ascOrder}
        onJumpTo={jumpTo}
        onToggleOrder={() => setAscOrder(!ascOrder)}
      />
    </div>
  );
};
