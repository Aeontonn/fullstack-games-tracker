from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from models.game import GameModel
from routes import game as game_routes

# Create the database tables based on the defined models
Base.metadata.create_all(bind=engine)

# Create the FastAPI app instance
app = FastAPI()

# Configure CORS middleware to allow requests from the frontend development servers
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

# Add the CORS middleware to the FastAPI app with the specified settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the game routes in the FastAPI app under the "/api" prefix
app.include_router(game_routes.router)

# Define a simple root endpoint to verify that the API is running
@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to the Game Library app!"}