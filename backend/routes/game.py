from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import game as game_model
from schemas import game as game_schema

router = APIRouter()

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