from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    JSON,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from app.database import Base


# ======================================================
# Collections
# ======================================================

class Collection(Base):
    __tablename__ = "collections"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    description = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    requests = relationship(
        "Request",
        back_populates="collection",
        cascade="all, delete-orphan",
    )


# ======================================================
# Saved Requests
# ======================================================

class Request(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    method = Column(String(10), nullable=False)

    url = Column(Text, nullable=False)

    params = Column(JSON, nullable=True)

    headers = Column(JSON, nullable=True)

    body = Column(Text, nullable=True)

    body_type = Column(
        String(30),
        nullable=True,
    )

    content_type = Column(
        String(100),
        nullable=True,
    )

    auth_type = Column(
        String(30),
        nullable=True,
    )

    auth_value = Column(
        Text,
        nullable=True,
    )

    collection_id = Column(
        Integer,
        ForeignKey("collections.id"),
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    collection = relationship(
        "Collection",
        back_populates="requests",
    )


# ======================================================
# Environments
# ======================================================

class Environment(Base):
    __tablename__ = "environments"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(100),
        nullable=False,
        unique=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    variables = relationship(
        "Variable",
        back_populates="environment",
        cascade="all, delete-orphan",
    )


# ======================================================
# Environment Variables
# ======================================================

class Variable(Base):
    __tablename__ = "variables"

    id = Column(Integer, primary_key=True, index=True)

    key = Column(
        String(100),
        nullable=False,
    )

    value = Column(
        Text,
        nullable=True,
    )

    is_enabled = Column(
        Boolean,
        default=True,
    )

    environment_id = Column(
        Integer,
        ForeignKey("environments.id"),
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    environment = relationship(
        "Environment",
        back_populates="variables",
    )


# ======================================================
# Request History
# ======================================================

class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)

    method = Column(
        String(10),
        nullable=False,
    )

    url = Column(
        Text,
        nullable=False,
    )

    status_code = Column(
        Integer,
        nullable=True,
    )

    response_time = Column(
        Integer,
        nullable=True,
    )

    response_size = Column(
        Integer,
        nullable=True,
    )

    request_body = Column(
        Text,
        nullable=True,
    )

    response_body = Column(
        Text,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )