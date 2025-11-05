# server/app/database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import json
from pathlib import Path

# -----------------------
# Database Setup
# -----------------------
SQLALCHEMY_DATABASE_URL = "sqlite:///./jobs.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# -----------------------
# Utility Functions
# -----------------------
def init_db():
    """Initialize database tables."""
    from . import models
    Base.metadata.create_all(bind=engine)


def get_all_jobs(db):
    """Return all jobs from the database."""
    from .models import Job
    return db.query(Job).all()


def import_seed_data(db):
    """Import initial data from data/seed.json into the database."""
    from .models import Company, Job, Section

    seed_file = Path(__file__).parent.parent / "data" / "seed.json"
    if not seed_file.exists():
        print("⚠️ seed.json not found, skipping import.")
        return

    with open(seed_file, "r") as f:
        data = json.load(f)

    for company_data in data.get("companies", []):
        company = Company(
            id=company_data["id"],
            name=company_data["name"],
            slug=company_data["slug"],
            website=company_data.get("website"),
            description=company_data.get("description"),
        )
        db.add(company)

        for job_data in company_data.get("jobs", []):
            job = Job(
                id=job_data["id"],
                title=job_data["title"],
                slug=job_data["slug"],
                location=job_data.get("location"),
                type=job_data.get("type"),
                description=job_data.get("description"),
                apply_url=job_data.get("apply_url"),
                company=company,
            )
            db.add(job)

    db.commit()
    print("✅ Seed data imported successfully!")


# -----------------------
# Dependency for FastAPI
# -----------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
