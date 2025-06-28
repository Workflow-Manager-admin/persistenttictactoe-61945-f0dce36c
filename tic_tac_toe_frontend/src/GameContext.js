import React, { createContext, useState, useContext } from "react";

// Game state context: Board, turn, status, winner, history, etc.
const GameContext = createContext();

/**
 * PUBLIC_INTERFACE
 * Provides game state and control logic to children.
 */
export function GameProvider({ children }) {
  // 0-based 9-element array for board.
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' or 'O'
  const [currentPlayer, setCurrentPlayer] = useState("X");
  // null if game ongoing, 'X' or 'O' if winner, 'TIE' for tie
  const [winner, setWinner] = useState(null);
  // Indices of winning line, if any
  const [winningLine, setWinningLine] = useState(null);
  // Move history (for demonstration; could be omitted)
  const [moveHistory, setMoveHistory] = useState([]);

  // For game history, an array of completed games (structure: {id, winner, board, moves, time, ...})
  const [gameHistory, setGameHistory] = useState([]);

  // PUBLIC_INTERFACE
  function handleSquareClick(i) {
    if (board[i] || winner) return; // Ignore if filled/won

    const newBoard = board.slice();
    newBoard[i] = currentPlayer;
    const newHistory = [
      ...moveHistory,
      { player: currentPlayer, position: i, board: [...newBoard] },
    ];
    setBoard(newBoard);
    setMoveHistory(newHistory);

    // Check for win
    const { winner: gameWinner, line } = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(line);
    } else if (newBoard.every((cell) => cell)) {
      setWinner("TIE");
      setWinningLine(null);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(null);
    setMoveHistory([]);
  }

  // PUBLIC_INTERFACE (for demo: add a finished game to history)
  function saveGameToHistory() {
    if (winner && (winner === "X" || winner === "O" || winner === "TIE")) {
      setGameHistory((prev) => [
        ...prev,
        {
          id: Date.now(),
          moves: moveHistory,
          winner,
          endTime: new Date().toLocaleString(),
          finalBoard: board,
        },
      ]);
    }
  }

  // PUBLIC_INTERFACE
  function loadGameFromHistory(game) {
    setBoard(game.finalBoard);
    setMoveHistory(game.moves);
    setWinner(game.winner);
    setWinningLine(calculateWinner(game.finalBoard).line);
    // Set next player based on move length
    setCurrentPlayer(
      (game.moves.length % 2 === 0 ? "X" : "O")
    );
  }

  // To be extended with backend fetch/save.
  return (
    <GameContext.Provider
      value={{
        board,
        currentPlayer,
        winner,
        winningLine,
        handleSquareClick,
        resetGame,
        moveHistory,
        gameHistory,
        saveGameToHistory,
        loadGameFromHistory,
        setGameHistory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useGame() {
  return useContext(GameContext);
}

// Helper: Check for a winner (returns {winner: 'X'|'O'|null, line: [idx,idx,idx]|null})
function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];
  for (const line of lines) {
    const [a,b,c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}
