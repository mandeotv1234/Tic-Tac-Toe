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
            className={`square-btn${highlight ? " winning" : ""}`}
        >
            {value}
        </button>
    );
};

