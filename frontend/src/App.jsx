import { useState, useEffect } from "react";

function App() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // NEW STATE: Memory for the form inputs. Matches our Pydantic schema!
  const [newGame, setNewGame] = useState({
    title: "",
    genre: "",
    release_year: "",
    rating: "",
    is_completed: false,
  });

  // Fetch games on load (unchanged)
  useEffect(() => {
    fetch("http://localhost:8000/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // NEW FUNCTION: Handle form submission
  const handleAddGame = (e) => {
    e.preventDefault(); // Stop the page from reloading!

    // Send the POST request to your backend
    fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tell FastAPI we are sending JSON
      },
      // Convert our React state object into a JSON string
      body: JSON.stringify(newGame),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add game");
        }
        return response.json();
      })
      .then((addedGame) => {
        // Success! Add the new game to our visual list immediately
        setGames([...games, addedGame]);

        // Clear the form fields so the user can add another game
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

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h1>My Game Library</h1>

      {/* --- NEW FORM SECTION --- */}
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
            // When the user types, update ONLY the 'title' part of the state
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
            // Using parseInt because HTML inputs always return strings, but our backend wants a number!
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
            // parseFloat because our backend expects a float for rating
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
              // Checkboxes use 'checked' instead of 'value'
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
      {/* --- END OF FORM SECTION --- */}

      {/* The game list (unchanged) */}
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
              }}
            >
              <strong>{game.title}</strong> ({game.release_year}) - {game.genre}
              <br />
              Rating: {game.rating}/10 |{" "}
              {game.is_completed ? "✅ Completed" : "❌ Not completed"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
