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
  if (winner === null) {
    statusMsg = `Current turn: ${currentPlayer}`;
  } else if (winner === "TIE") {
    statusMsg = "It's a tie!";
  } else {
    statusMsg = `Winner: ${winner}`;
  }

  // Should "Save Game" only be enabled if just won/tied, not already in history? For now, always enabled if game finished.
  const gameOver = winner !== null;
  const canSave = gameOver;

  return (
    <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
        {statusMsg}
      </div>
      <div style={{ margin: "6px 0" }}>
        <button
          className="btn"
          onClick={resetGame}
          style={{ fontSize: 15, padding: "8px 24px", borderRadius: 8 }}
        >
          {gameOver ? "New Game" : "Reset"}
        </button>
        {canSave && (
          <button
            className="btn"
            style={{
              fontSize: 15,
              padding: "8px 24px",
              borderRadius: 8,
              background: "#388e3c",
              color: "#fff",
              marginLeft: 14,
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
