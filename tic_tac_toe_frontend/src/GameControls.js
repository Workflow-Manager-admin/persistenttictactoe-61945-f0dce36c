import React from "react";
import { useGame } from "./GameContext";

/**
 * PUBLIC_INTERFACE
 * GameControls presents control buttons and game status.
 */
function GameControls() {
  const {
    winner,
    currentPlayer,
    resetGame,
    board,
    saveGameToHistory,
  } = useGame();

  let statusMsg = "";
  let statusColor = "var(--color-accent)";
  if (winner === null) {
    statusMsg = `Current Turn: `;
    statusColor = currentPlayer === "X" ? "var(--color-primary)" : "var(--color-secondary)";
    statusMsg += (
      <span style={{
        color: statusColor,
        fontWeight: 700,
        fontFamily: "inherit"
      }}>{currentPlayer}</span>
    );
  } else if (winner === "TIE") {
    statusMsg = <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>It's a tie!</span>;
  } else {
    statusMsg = (
      <>
        <span style={{ color: winner === "X" ? "var(--color-primary)" : "var(--color-secondary)", fontWeight: 700 }}>
          {winner}
        </span>
        <span style={{ color: "var(--color-accent)" }}> wins!</span>
      </>
    );
  }

  // Should "Save Game" only be enabled if just won/tied, not already in history? For now, always enabled if game finished.
  const gameOver = winner !== null;
  const canSave = gameOver;

  return (
    <div style={{ marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="ttt-game-status-bar">
        {statusMsg}
      </div>
      <div style={{ margin: "10px 0 0 0", display: "flex", gap: 12 }}>
        <button
          className="btn btn-accent"
          onClick={resetGame}
          style={{ minWidth: 106 }}
        >
          {gameOver ? "New Game" : "Reset"}
        </button>
        {canSave && (
          <button
            className="btn btn-secondary"
            style={{
              marginLeft: 3,
              minWidth: 106,
            }}
            onClick={saveGameToHistory}
          >
            Save Game
          </button>
        )}
      </div>
    </div>
  );
}

export default GameControls;
