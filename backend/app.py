from fastapi import FastAPI
from database import engine, Base
from models.game import GameModel
from routes import game as game_routes

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(game_routes.router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to the Game Library app!"}