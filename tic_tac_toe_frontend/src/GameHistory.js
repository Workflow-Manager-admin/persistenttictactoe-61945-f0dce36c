import React from "react";
import { useGame } from "./GameContext";

/**
 * PUBLIC_INTERFACE
 * GameHistory component shows completed games (local for now).
 */
function GameHistory() {
  const { gameHistory, loadGameFromHistory } = useGame();

  if (!gameHistory.length) {
    return <div style={{ marginTop: 24 }}>No games played yet.</div>;
  }

  return (
    <div className="ttt-game-history" style={{
      margin: "16px 0",
      padding: 12,
      background: "var(--bg-secondary)",
      borderRadius: 8,
      minWidth: 300,
      border: "1px solid var(--border-color)",
    }}>
      <h2 style={{ marginTop: 0, fontSize: 20 }}>Game History</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {gameHistory.map((game) => (
          <li key={game.id} style={{
            borderBottom: "1px solid var(--border-color)",
            marginBottom: 8,
            paddingBottom: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>
              {game.endTime} —{" "}
              <span style={{
                color: game.winner === "X" ? "#1976d2" : game.winner === "O" ? "#ffb300" : "#888",
                fontWeight: "bold"
              }}>
                {game.winner === "TIE" ? "Tie" : `${game.winner} won`}
              </span>
              {" "}({game.moves.length} moves)
            </span>
            <button
              className="btn"
              onClick={() => loadGameFromHistory(game)}
              style={{ marginLeft: 8, fontSize: 12, padding: "4px 10px", borderRadius: 6 }}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;
