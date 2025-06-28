import React from "react";
import "./App.css";

/**
 * Square functional component for a single Tic Tac Toe cell.
 * @param {object} props
 */
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`ttt-square${highlight ? " highlight" : ""}`}
      onClick={onClick}
      style={{
        width: 60,
        height: 60,
        fontSize: 32,
        fontWeight: "bold",
        color: "var(--text-primary)",
        background: highlight ? "var(--text-secondary)" : "var(--bg-secondary)",
        border: "2px solid var(--border-color)",
        outline: "none",
        cursor: value ? "default" : "pointer",
        transition: "background 0.25s",
      }}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function GameBoard({ board, onSquareClick, winningLine }) {
  /**
   * Renders the squares in a grid with highlights for any winning line.
   */
  const renderSquare = (i) => (
    <Square
      key={i}
      value={board[i]}
      onClick={() => onSquareClick(i)}
      highlight={winningLine && winningLine.includes(i)}
    />
  );

  return (
    <div className="ttt-board" style={{ display: "inline-block" }}>
      {[0, 1, 2].map((row) => (
        <div key={row} style={{ display: "flex" }}>
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
