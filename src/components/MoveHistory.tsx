import React from "react";

type MoveHistoryProps = {
  history: { moveLoc: string | null }[];
  stepNumber: number;
  ascOrder: boolean;
  onJumpTo: (move: number) => void;
  onToggleOrder: () => void;
};

export const MoveHistory: React.FC<MoveHistoryProps> = ({
  history,
  stepNumber,
  ascOrder,
  onJumpTo,
  onToggleOrder,
}) => {
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
        <button
          className="underline text-blue-600 hover:text-blue-800"
          onClick={() => onJumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  if (!ascOrder) moves = [...moves].reverse();

  return (
    <div className="mt-4 flex flex-col items-center">
      <button
        onClick={onToggleOrder}
        className="mb-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Sort {ascOrder ? "Descending" : "Ascending"}
      </button>
      <ol>{moves}</ol>
    </div>
  );
};
