import React, { useState, useEffect } from "react";
import "./App.css";
import { GameProvider } from "./GameContext";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import GameHistory from "./GameHistory";

function App() {
  // Light-only, modern
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1
          style={{
            fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
            fontWeight: 900,
            fontSize: 44,
            margin: "12px 0 2px 0",
            letterSpacing: "1.7px",
            color: "var(--color-primary)",
            lineHeight: 1,
          }}
        >
          <span style={{
            color: "var(--color-accent)", fontWeight: 700, fontSize: 38, verticalAlign:"middle"
          }}>■ </span>
          Tic Tac Toe
        </h1>
        <div
          style={{
            color: "var(--text-secondary)",
            fontSize: 18,
            marginBottom: 28,
            fontWeight: 400,
            letterSpacing: ".6px"
          }}
        >
          Play and keep your games forever.
        </div>
        <GameProvider>
          {/* Main Game Area */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "54px",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 10,
              width: "100%",
              flexWrap:"wrap"
            }}
          >
            <div>
              <GameBoardWrapper />
              <GameControls />
            </div>
            <div style={{ minWidth: 320, maxWidth: 380 }}>
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
