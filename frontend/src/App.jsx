import { useState, useEffect } from "react";
import "./App.css"; // IMPORTANT: This tells React to load your new CSS file!

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

  const handleToggleComplete = (game) => {
    const updatedData = {
      is_completed: !game.is_completed,
    };

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
        setGames(
          games.map((g) => (g.id === game.id ? updatedGameFromServer : g)),
        );
      })
      .catch((error) => console.error("Error updating game:", error));
  };

  return (
    // Instead of inline styles, we now use descriptive class names
    <div className="app-container">
      <h1>My Game Library</h1>

      <div className="form-container">
        <h2>Add a New Game</h2>
        <form onSubmit={handleAddGame} className="game-form">
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
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={newGame.is_completed}
              onChange={(e) =>
                setNewGame({ ...newGame, is_completed: e.target.checked })
              }
            />
            Completed?
          </label>
          <button type="submit" className="btn btn-primary">
            Add Game
          </button>
        </form>
      </div>

      {isLoading ? (
        <p>Loading games from database...</p>
      ) : (
        <ul className="game-list">
          {games.map((game) => (
            <li key={game.id} className="game-item">
              
              <div className="game-details">
                <strong>{game.title}</strong> ({game.release_year}) - {game.genre}
                <br />
                Rating: {game.rating}/10
              </div>

              <div className="game-actions">
                <button
                  onClick={() => handleToggleComplete(game)}
                  // We dynamically apply either the success or warning class based on the status!
                  className={`btn ${game.is_completed ? "btn-success" : "btn-warning"}`}
                >
                  {game.is_completed ? "✅ Completed" : "❌ Mark as Done"}
                </button>

                <button
                  onClick={() => handleDelete(game.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;