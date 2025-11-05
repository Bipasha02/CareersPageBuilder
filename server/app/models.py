# server/app/models.py
from sqlalchemy import Column, String, Text, Boolean, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class Company(Base):
    __tablename__ = "company"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    website = Column(String)
    logo = Column(String)
    banner_url = Column(String)
    video_url = Column(String)
    description = Column(Text)
    theme_color = Column(String, default="#0a66c2")
    sections = Column(Text, default="[]")  # Store JSON as text

    # Relationships
    jobs = relationship("Job", back_populates="company", cascade="all, delete-orphan")
    section_objects = relationship("Section", back_populates="company", cascade="all, delete-orphan")


class Section(Base):
    __tablename__ = "section"

    id = Column(String, primary_key=True, index=True)
    company_id = Column(String, ForeignKey("company.id"), nullable=False)
    type = Column(String)
    title = Column(String, nullable=False)
    content = Column(Text)
    position = Column(Integer, default=1)
    is_visible = Column(Boolean, default=True)

    company = relationship("Company", back_populates="section_objects")


class Job(Base):
    __tablename__ = "job"

    id = Column(String, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    location = Column(String)
    type = Column(String)
    description = Column(Text)
    apply_url = Column(String)
    posted_at = Column(DateTime, default=datetime.utcnow)
    published = Column(Boolean, default=True)

    company_id = Column(String, ForeignKey("company.id"), nullable=False)

    company = relationship("Company", back_populates="jobs")
