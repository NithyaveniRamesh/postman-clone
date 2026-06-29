from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/environments",
    tags=["Environments"],
)

@router.post(
    "/",
    response_model=schemas.EnvironmentResponse,
)
def create_environment(
    environment: schemas.EnvironmentCreate,
    db: Session = Depends(get_db),
):
    return crud.create_environment(
        db,
        environment,
    )


@router.get(
    "/",
    response_model=list[schemas.EnvironmentResponse],
)
def get_environments(
    db: Session = Depends(get_db),
):
    return crud.get_environments(db)


@router.get(
    "/{environment_id}",
    response_model=schemas.EnvironmentResponse,
)
def get_environment(
    environment_id: int,
    db: Session = Depends(get_db),
):
    environment = crud.get_environment(
        db,
        environment_id,
    )

    if environment is None:
        raise HTTPException(
            status_code=404,
            detail="Environment not found",
        )

    return environment


@router.put(
    "/{environment_id}",
    response_model=schemas.EnvironmentResponse,
)
def update_environment(
    environment_id: int,
    environment: schemas.EnvironmentUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_environment(
        db,
        environment_id,
        environment,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Environment not found",
        )

    return updated


@router.delete("/{environment_id}")
def delete_environment(
    environment_id: int,
    db: Session = Depends(get_db),
):
    deleted = crud.delete_environment(
        db,
        environment_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Environment not found",
        )

    return {
        "message": "Environment deleted successfully"
    }


