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
    <div className="ttt-game-history">
      <h2>Game History</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {gameHistory.map((game) => (
          <li key={game.id}>
            <span>
              <span style={{ fontWeight: 500, color: "var(--text-secondary)", fontSize: 14 }}>{game.endTime}</span> —{" "}
              <span style={{
                color:
                  game.winner === "X"
                    ? "var(--color-primary)"
                    : game.winner === "O"
                    ? "var(--color-secondary)"
                    : "var(--color-accent)",
                fontWeight: 700
              }}>
                {game.winner === "TIE" ? "Tie" : `${game.winner} won`}
              </span>
              {" "}
              <span style={{color:"#aaa", fontWeight: 400}}>({game.moves.length} moves)</span>
            </span>
            <button
              className="btn btn-accent"
              onClick={() => loadGameFromHistory(game)}
              style={{ fontSize: 13, padding: "6px 16px", borderRadius: 9, minWidth:60, boxShadow:'none' }}
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
