from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import game as game_model
from schemas import game as game_schema

router = APIRouter()

# Endpoint to create a new game in the database
@router.post("/games/", response_model=game_schema.Game)
def create_game(
  game: game_schema.GameCreate, 
  db: Session = Depends(get_db)
):
  db_game = game_model.GameModel(**game.model_dump())
  db.add(db_game)
  db.commit()
  db.refresh(db_game)
  return db_game

# Endpoint to retrieve all games from the database
@router.get("/games/", response_model=list[game_schema.Game])
def read_games(db: Session = Depends(get_db)):
  games = db.query(game_model.GameModel).all()
  return games

# Endpoint to retrieve a single game by its ID
@router.put("/games/{game_id}", response_model=game_schema.Game)
def update_game(
  game_id: int,
  game_update: game_schema.GameUpdate,
  db: Session = Depends(get_db)
):
  db_game = db.query(game_model.GameModel).filter(game_model.GameModel.id == game_id).first()
  if db_game is None:
    raise HTTPException(status_code=404, detail="Game not found")
  
  # Use the model_dump method to get a dictionary of the fields that were provided in the update request
  update_data = game_update.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(db_game, key, value)  
  db.commit()
  db.refresh(db_game)
  return db_game

# Endpoint to delete a game from the database by its ID
@router.delete("/games/{game_id}")
def delete_game(game_id: int, db: Session = Depends(get_db)):
  db_game = db.query(game_model.GameModel).filter(game_model.GameModel.id == game_id).first()
  if db_game is None:
    raise HTTPException(status_code=404, detail="Game not found")
  db.delete(db_game)
  db.commit()
  return {"message": f"Game with ID {game_id} has been successfully deleted"}