import React from "react";

type StatusProps = {
  winner: string | null;
  nextPlayer: string;
  squares: (string | null)[];
};

export const Status: React.FC<StatusProps> = ({ winner, nextPlayer, squares }) => {
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "Draw! No winner.";
  } else {
    status = `Next player: ${nextPlayer}`;
  }

  return <div className="mt-4 text-lg font-semibold">{status}</div>;
};
