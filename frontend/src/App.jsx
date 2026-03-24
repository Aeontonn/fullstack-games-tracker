import { useState, useEffect } from "react";

function App() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newGame, setNewGame] = useState({
    title: "",
    genre: "",
    release_year: "",
    rating: "",
    is_completed: false,
  });

  useEffect(() => {
    fetch("http://localhost:8000/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleAddGame = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add game");
        return response.json();
      })
      .then((addedGame) => {
        setGames([...games, addedGame]);
        setNewGame({
          title: "",
          genre: "",
          release_year: "",
          rating: "",
          is_completed: false,
        });
      })
      .catch((error) => console.error("Error adding game:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/games/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete game");
        setGames(games.filter((game) => game.id !== id));
      })
      .catch((error) => console.error("Error deleting game:", error));
  };

  // --- NEW: UPDATE FUNCTION ---
  // We pass the entire 'game' object so we know its current status
  const handleToggleComplete = (game) => {
    // 1. Prepare the data: We only send the field we want to update, flipping its current boolean value
    const updatedData = {
      is_completed: !game.is_completed,
    };

    // 2. Send the PUT request
    fetch(`http://localhost:8000/games/${game.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update game");
        return response.json();
      })
      .then((updatedGameFromServer) => {
        // 3. Update React State using .map()
        // If the ID matches, replace it with the new data from the server. Otherwise, keep the old game.
        setGames(
          games.map((g) => (g.id === game.id ? updatedGameFromServer : g)),
        );
      })
      .catch((error) => console.error("Error updating game:", error));
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h1>My Game Library</h1>

      <div
        style={{
          background: "#f0f0f0",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      >
        <h2>Add a New Game</h2>
        <form
          onSubmit={handleAddGame}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Title"
            value={newGame.title}
            onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Genre (e.g., RPG, FPS)"
            value={newGame.genre}
            onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Release Year (e.g., 2015)"
            value={newGame.release_year}
            onChange={(e) =>
              setNewGame({
                ...newGame,
                release_year: parseInt(e.target.value) || "",
              })
            }
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Rating (1-10)"
            value={newGame.rating}
            onChange={(e) =>
              setNewGame({
                ...newGame,
                rating: parseFloat(e.target.value) || "",
              })
            }
            required
          />
          <label>
            <input
              type="checkbox"
              checked={newGame.is_completed}
              onChange={(e) =>
                setNewGame({ ...newGame, is_completed: e.target.checked })
              }
            />{" "}
            Completed?
          </label>
          <button
            type="submit"
            style={{
              padding: "10px",
              background: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Game
          </button>
        </form>
      </div>

      {isLoading ? (
        <p>Loading games from database...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {games.map((game) => (
            <li
              key={game.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{game.title}</strong> ({game.release_year}) -{" "}
                {game.genre}
                <br />
                Rating: {game.rating}/10
                {/* --- NEW: TOGGLE BUTTON --- */}
                {/* We replaced the static text with a button that triggers our new function */}
                <button
                  onClick={() => handleToggleComplete(game)}
                  style={{
                    marginLeft: "10px",
                    padding: "4px 8px",
                    cursor: "pointer",
                    background: game.is_completed ? "#28a745" : "#ffc107",
                    color: game.is_completed ? "white" : "black",
                    border: "none",
                    borderRadius: "3px",
                  }}
                >
                  {game.is_completed ? "✅ Completed" : "❌ Mark as Done"}
                </button>
              </div>

              <button
                onClick={() => handleDelete(game.id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
