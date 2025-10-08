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
            ? `Go to move #${move} ${step.moveLoc ? step.moveLoc : ""}`
            : "Go to game start";

        if (move === stepNumber) {
            return (
                <li key={move} className="current-move">
                    You are at move #{move} {step.moveLoc ? step.moveLoc : ""}
                </li>
            );
        }

        return (
            <li key={move}>
                <button onClick={() => onJumpTo(move)}>
                    {desc}
                </button>
            </li>
        );
    });

    if (!ascOrder) moves = [...moves].reverse();

    return (
        <div className="move-history">
            <button
                onClick={onToggleOrder}
                className="sort-btn"
            >
                Sort: {ascOrder ? "Descending" : "Ascending"}
            </button>
            <ol>{moves}</ol>
        </div>
    );
};

