from sqlalchemy.orm import Session

from app import models


def seed_database(db: Session):
    # Don't seed if data already exists
    if db.query(models.Collection).first():
        return

    # ==========================
    # Collection
    # ==========================

    collection = models.Collection(
        name="Sample APIs",
        description="Preloaded sample requests",
    )

    db.add(collection)
    db.commit()
    db.refresh(collection)

    # ==========================
    # Saved Requests
    # ==========================

    request1 = models.Request(
        name="Get Posts",
        method="GET",
        url="https://jsonplaceholder.typicode.com/posts",
        collection_id=collection.id,
    )

    request2 = models.Request(
        name="Get Users",
        method="GET",
        url="https://jsonplaceholder.typicode.com/users",
        collection_id=collection.id,
    )

    db.add_all([request1, request2])

    # ==========================
    # Environment
    # ==========================

    environment = models.Environment(
        name="Development",
    )

    db.add(environment)
    db.commit()
    db.refresh(environment)

    # ==========================
    # Variables
    # ==========================

    variables = [
        models.Variable(
            key="baseUrl",
            value="https://jsonplaceholder.typicode.com",
            environment_id=environment.id,
        ),
        models.Variable(
            key="token",
            value="sample-token",
            environment_id=environment.id,
        ),
    ]

    db.add_all(variables)

    # ==========================
    # Sample History
    # ==========================

    history = models.History(
        method="GET",
        url="https://jsonplaceholder.typicode.com/posts",
        status_code=200,
        response_time=150,
        response_size=2048,
    )

    db.add(history)

    db.commit()