import React from "react";
import "./App.css";

/**
 * Square functional component for a single Tic Tac Toe cell.
 * @param {object} props
 */
function Square({ value, onClick, highlight }) {
  // Color X and O per theme; highlight with accent if winning
  let color;
  if (highlight) color = "#fff";
  else if (value === "X") color = "var(--square-x)";
  else if (value === "O") color = "var(--square-o)";
  else color = "var(--text-primary)";
  return (
    <button
      className={`ttt-square${highlight ? " highlight" : ""}`}
      onClick={onClick}
      style={{
        width: 66,
        height: 66,
        fontSize: 38,
        fontWeight: 800,
        color,
        background: highlight
          ? "var(--square-win)"
          : value === "X"
          ? "#e1f0fc"
          : value === "O"
          ? "#fffef4"
          : "var(--square-blank)",
        border: "2.2px solid var(--border-color)",
        outline: "none",
        cursor: value ? "default" : "pointer",
        margin: 7,
        boxShadow: highlight
          ? "0 0 10px 1.5px var(--color-secondary)"
          : "0 1px 3px 0 rgba(25,118,210,0.06)",
        letterSpacing: ".08em",
        transition: "background 0.14s, box-shadow 0.14s, color 0.2s",
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
