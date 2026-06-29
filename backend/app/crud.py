from sqlalchemy.orm import Session

from app import models, schemas

from sqlalchemy.orm import Session, joinedload


# ==========================================================
# COLLECTION CRUD
# ==========================================================

def create_collection(
    db: Session,
    collection: schemas.CollectionCreate,
):
    db_collection = models.Collection(
        name=collection.name,
        description=collection.description,
    )

    db.add(db_collection)
    db.commit()
    db.refresh(db_collection)

    return db_collection


def get_collections(
    db: Session,
):
    return (
        db.query(models.Collection)
        .options(
            joinedload(models.Collection.requests)
        )
        .all()
    )


def get_collection(
    db: Session,
    collection_id: int,
):
    return (
        db.query(models.Collection)
        .options(
            joinedload(models.Collection.requests)
        )
        .filter(
            models.Collection.id == collection_id
        )
        .first()
    )


def update_collection(
    db: Session,
    collection_id: int,
    collection: schemas.CollectionUpdate,
):
    db_collection = get_collection(
        db,
        collection_id,
    )

    if db_collection is None:
        return None

    update_data = collection.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            db_collection,
            key,
            value,
        )

    db.commit()
    db.refresh(db_collection)

    return db_collection


def delete_collection(
    db: Session,
    collection_id: int,
):
    db_collection = get_collection(
        db,
        collection_id,
    )

    if db_collection is None:
        return None

    db.delete(db_collection)
    db.commit()

    return db_collection


# ==========================================================
# REQUEST CRUD
# ==========================================================

def create_request(
    db: Session,
    request: schemas.RequestCreate,
):
    db_request = models.Request(
        name=request.name,
        method=request.method,
        url=str(request.url),
        params=request.params,
        headers=request.headers,
        body=request.body,
        body_type=request.body_type,
        content_type=request.content_type,
        auth_type=request.auth_type,
        auth_value=request.auth_value,
        collection_id=request.collection_id,
    )

    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    return db_request


def get_requests(
    db: Session,
):
    return db.query(models.Request).all()


def get_request(
    db: Session,
    request_id: int,
):
    return (
        db.query(models.Request)
        .filter(models.Request.id == request_id)
        .first()
    )


def get_requests_by_collection(
    db: Session,
    collection_id: int,
):
    return (
        db.query(models.Request)
        .filter(
            models.Request.collection_id == collection_id
        )
        .all()
    )


def update_request(
    db: Session,
    request_id: int,
    request: schemas.RequestUpdate,
):
    db_request = get_request(
        db,
        request_id,
    )

    if db_request is None:
        return None

    update_data = request.model_dump(
        exclude_unset=True
    )

    if "url" in update_data:
        update_data["url"] = str(update_data["url"])

    for key, value in update_data.items():
        setattr(
            db_request,
            key,
            value,
        )

    db.commit()
    db.refresh(db_request)

    return db_request


def delete_request(
    db: Session,
    request_id: int,
):
    db_request = get_request(
        db,
        request_id,
    )

    if db_request is None:
        return None

    db.delete(db_request)
    db.commit()

    return db_request

# ==========================================================
# ENVIRONMENT CRUD
# ==========================================================

def create_environment(
    db: Session,
    environment: schemas.EnvironmentCreate,
):
    db_environment = models.Environment(
        name=environment.name,
    )

    db.add(db_environment)
    db.commit()
    db.refresh(db_environment)

    return db_environment


def get_environments(
    db: Session,
):
    return (
        db.query(models.Environment)
        .order_by(models.Environment.id)
        .all()
    )


def get_environment(
    db: Session,
    environment_id: int,
):
    return (
        db.query(models.Environment)
        .filter(
            models.Environment.id == environment_id
        )
        .first()
    )


def update_environment(
    db: Session,
    environment_id: int,
    environment: schemas.EnvironmentUpdate,
):
    db_environment = get_environment(
        db,
        environment_id,
    )

    if db_environment is None:
        return None

    update_data = environment.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            db_environment,
            key,
            value,
        )

    db.commit()
    db.refresh(db_environment)

    return db_environment


def delete_environment(
    db: Session,
    environment_id: int,
):
    db_environment = get_environment(
        db,
        environment_id,
    )

    if db_environment is None:
        return None

    db.delete(db_environment)
    db.commit()

    return db_environment


# ==========================================================
# VARIABLE CRUD
# ==========================================================

def create_variable(
    db: Session,
    variable: schemas.VariableCreate,
):
    db_variable = models.Variable(
        key=variable.key,
        value=variable.value,
        is_enabled=variable.is_enabled,
        environment_id=variable.environment_id,
    )

    db.add(db_variable)
    db.commit()
    db.refresh(db_variable)

    return db_variable


def get_variables(
    db: Session,
):
    return (
        db.query(models.Variable)
        .order_by(models.Variable.id)
        .all()
    )


def get_variable(
    db: Session,
    variable_id: int,
):
    return (
        db.query(models.Variable)
        .filter(
            models.Variable.id == variable_id
        )
        .first()
    )


def get_variables_by_environment(
    db: Session,
    environment_id: int,
):
    return (
        db.query(models.Variable)
        .filter(
            models.Variable.environment_id == environment_id
        )
        .all()
    )


def update_variable(
    db: Session,
    variable_id: int,
    variable: schemas.VariableUpdate,
):
    db_variable = get_variable(
        db,
        variable_id,
    )

    if db_variable is None:
        return None

    update_data = variable.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            db_variable,
            key,
            value,
        )

    db.commit()
    db.refresh(db_variable)

    return db_variable


def delete_variable(
    db: Session,
    variable_id: int,
):
    db_variable = get_variable(
        db,
        variable_id,
    )

    if db_variable is None:
        return None

    db.delete(db_variable)
    db.commit()

    return db_variable


# ==========================================================
# HISTORY CRUD
# ==========================================================

def create_history(
    db: Session,
    history,
):
    db.add(history)
    db.commit()
    db.refresh(history)

    return history


def get_history(
    db: Session,
):
    return (
        db.query(models.History)
        .order_by(
            models.History.created_at.desc()
        )
        .all()
    )


def get_history_item(
    db: Session,
    history_id: int,
):
    return (
        db.query(models.History)
        .filter(
            models.History.id == history_id
        )
        .first()
    )


def delete_history(
    db: Session,
    history_id: int,
):
    history = get_history_item(
        db,
        history_id,
    )

    if history is None:
        return None

    db.delete(history)
    db.commit()

    return history


def clear_history(
    db: Session,
):
    db.query(models.History).delete()

    db.commit()

    return {
        "message": "History cleared successfully"
    }