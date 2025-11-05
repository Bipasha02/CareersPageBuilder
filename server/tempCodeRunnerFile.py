from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database file path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "jobs.db")

# SQLite connection URL
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

# Create engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    echo=False, 
    connect_args={"check_same_thread": False}
)

# SessionLocal for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for ORM models
Base = declarative_base()
