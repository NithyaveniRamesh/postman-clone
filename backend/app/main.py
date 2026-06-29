from fastapi import FastAPI

from app.database import Base, engine
import app.models

from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app.seed import seed_database

from app.exceptions import global_exception_handler

from app.routers import (
    collections,
    requests,
    runner,
    environments,
    variables,
    history,
)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Postman Clone API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(collections.router)
app.include_router(requests.router)
app.include_router(runner.router)
app.include_router(environments.router)
app.include_router(variables.router)
app.include_router(history.router)


@app.get("/")
def root():
    return {
        "message": "Welcome to the Postman Clone Backend!"
    }


Base.metadata.create_all(bind=engine)

from app.database import SessionLocal

db = SessionLocal()

seed_database(db)

db.close()

app.add_exception_handler(
    Exception,
    global_exception_handler,
)