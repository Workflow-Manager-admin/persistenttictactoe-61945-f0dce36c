import React, { useState, useEffect } from "react";
import "./App.css";
import { GameProvider } from "./GameContext";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import GameHistory from "./GameHistory";

// PUBLIC_INTERFACE
function App() {
  // App-level theme state (optional)
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className="App">
      <header className="App-header">
        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <h1 style={{
          fontFamily: "inherit",
          fontWeight: "bold",
          fontSize: 42,
          margin: "16px 0 4px 0",
          letterSpacing: "2px",
          color: "var(--text-primary)",
        }}>Tic Tac Toe</h1>
        <div style={{
          color: "var(--text-secondary)", fontSize: 17, marginBottom: 24
        }}>
          Play and keep your games forever.
        </div>

        <GameProvider>
          {/* Main Game Area */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "48px",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 18
          }}>
            <div>
              <GameBoardWrapper />
              <GameControls />
            </div>
            <div style={{
              minWidth: 320,
              maxWidth: 380
            }}>
              <GameHistory />
            </div>
          </div>
        </GameProvider>
      </header>
    </div>
  );
}

// Helper: Wrap GameBoard with correct data from context
function GameBoardWrapper() {
  const { board, handleSquareClick, winningLine } = require("./GameContext").useGame();
  return (
    <GameBoard
      board={board}
      onSquareClick={handleSquareClick}
      winningLine={winningLine}
    />
  );
}

export default App;
