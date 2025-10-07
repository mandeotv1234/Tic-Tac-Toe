import React from "react";

type SquareProps = {
  value: string | null;
  onClick: () => void;
  highlight: boolean;
};

export const Square: React.FC<SquareProps> = ({ value, onClick, highlight }) => {
  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 border text-2xl font-bold transition-colors duration-200 
        ${highlight ? "bg-yellow-300" : "bg-white hover:bg-gray-100"}`}
    >
      {value}
    </button>
  );
};
