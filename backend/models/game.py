from sqlalchemy  import Column, Integer, String, Float, Boolean
from database import Base

class GameModel(Base):
    # Defines the name of the table in the database as "games"
    __tablename__ = "games"
    
    # The primary key uniquely identifies each row and auto-increments with each new entry
    id = Column(Integer, primary_key=True, index=True)
    
    # Standard columns for the game attributes
    title = Column(String, index=True)
    genre = Column(String)
    release_year = Column(Integer)
    rating = Column(Float)
    
    # For tracking whether the game has been completed or not, set as "not completed" by default
    is_completed = Column(Boolean, default=False)