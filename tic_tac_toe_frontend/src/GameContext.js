// PUBLIC_INTERFACE
import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import * as api from "./api";

// Game state context: Board, turn, status, winner, history, etc.
const GameContext = createContext();

const EMPTY_BOARD = Array(9).fill(null);

/**
 * PUBLIC_INTERFACE
 * Provides game state and control logic to children.
 */
export function GameProvider({ children }) {
  // The id of the current game
  const [gameId, setGameId] = useState(null);

  // Synced backend state for the active game
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);

  // List of all games from backend
  const [gameHistory, setGameHistory] = useState([]);

  // Loading and error UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // PUBLIC_INTERFACE
  const refreshGameList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const games = await api.listGames();
      setGameHistory(games);
    } catch (e) {
      setError(e.error?.detail || "Failed to load games");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // PUBLIC_INTERFACE
  const newGame = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const game = await api.createGame();
      setGameId(game.id);
      syncWithGameState(game);
      // Refetch game list to include the new game at the top
      refreshGameList();
    } catch (e) {
      setError(e.error?.detail || "Failed to create game");
    } finally {
      setIsLoading(false);
    }
  }, [refreshGameList]);

  // (Rehydrate full state from a backend game record)
  function syncWithGameState(game) {
    setBoard(game.board_state.split(",").map(s => (s === " " ? null : s)));
    setCurrentPlayer(game.current_player);
    setWinner(game.status === "finished" ? game.winner
      : game.status === "draw" ? "TIE"
      : null
    );
    setMoveHistory(Array.isArray(game.moves) ? game.moves : []);
    // Determine winning line (if any)
    let line = null;
    if (game.status === "finished" && boardHasWinningLine(game.board_state, game.winner)) {
      line = boardGetWinningLine(game.board_state, game.winner);
    }
    setWinningLine(line);
  }

  // PUBLIC_INTERFACE
  const handleSquareClick = useCallback(async (i) => {
    if (board[i] !== null || winner || !gameId) return; // Ignore filled, game-over, or no game started
    setIsLoading(true);
    setError(null);
    try {
      // Backend: Make Move; payload: { position, player } (player: X|O)
      const next = await api.makeMove(gameId, { position: i, player: currentPlayer });
      syncWithGameState(next);
      // Refresh game list if finished
      if (next.status !== "in_progress") refreshGameList();
    } catch (e) {
      setError(e.error?.detail || "Move failed");
    } finally {
      setIsLoading(false);
    }
  }, [board, currentPlayer, winner, gameId, refreshGameList]);

  // PUBLIC_INTERFACE
  const resetGame = useCallback(() => {
    // Start a new backend game
    newGame();
  }, [newGame]);

  // PUBLIC_INTERFACE
  const loadGameFromHistory = useCallback(async (gameObj) => {
    setIsLoading(true);
    setError(null);
    try {
      // Refetch latest game state from server
      const full = await api.getGameState(gameObj.id);
      setGameId(full.id);
      syncWithGameState(full);
    } catch (e) {
      setError(e.error?.detail || "Could not load game");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect: On mount, fetch latest games
  useEffect(() => {
    refreshGameList();
  }, [refreshGameList]);

  // Effect: when newGame should be called (start new on mount)
  useEffect(() => {
    if (!gameId) newGame();
  }, [gameId, newGame]);

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
        loadGameFromHistory,
        setGameHistory,
        isLoading,
        error,
        refreshGameList,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// Helpers for working with board/winning lines
function boardHasWinningLine(boardState, symbol) {
  const cells = boardState.split(",");
  return boardGetWinningLine(boardState, symbol) !== null;
}

function boardGetWinningLine(boardState, symbol) {
  const cells = boardState.split(",");
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const line of lines) {
    if (line.every(idx => cells[idx] === symbol)) return line;
  }
  return null;
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
