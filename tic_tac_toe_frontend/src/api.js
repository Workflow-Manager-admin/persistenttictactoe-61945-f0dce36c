//
// PUBLIC_INTERFACE
// API utility for interacting with the backend Tic Tac Toe API.
//

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://vscode-internal-57-dev.dev01.cloud.kavia.ai:3001";

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  if (!res.ok) {
    // Will throw {error, status}
    const text = await res.text();
    let err;
    try {
      err = JSON.parse(text);
    } catch {
      err = { detail: text };
    }
    throw { error: err, status: res.status };
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function createGame() {
  /** POST /games/ - Create new game, returns game object (id, board_state, etc) */
  return fetchJSON(`${API_BASE}/games/`, {
    method: "POST",
  });
}

// PUBLIC_INTERFACE
export async function listGames() {
  /** GET /games/ - Returns array of games (summary info) */
  return fetchJSON(`${API_BASE}/games/`);
}

// PUBLIC_INTERFACE
export async function getGameState(gameId) {
  /** GET /games/{gameId}/ - Returns full game state (board, status, moves, etc) */
  return fetchJSON(`${API_BASE}/games/${gameId}/`);
}

// PUBLIC_INTERFACE
export async function makeMove(gameId, { position, player }) {
  /** POST /games/{gameId}/moves/ - Make a move, returns new game state */
  return fetchJSON(`${API_BASE}/games/${gameId}/moves/`, {
    method: "POST",
    body: JSON.stringify({ position, player }),
  });
}
