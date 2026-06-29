from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/variables",
    tags=["Variables"],
)

@router.post(
    "/",
    response_model=schemas.VariableResponse,
)
def create_variable(
    variable: schemas.VariableCreate,
    db: Session = Depends(get_db),
):
    return crud.create_variable(
        db,
        variable,
    )

@router.get(
    "/",
    response_model=list[schemas.VariableResponse],
)
def get_variables(
    db: Session = Depends(get_db),
):
    return crud.get_variables(db)

@router.get(
    "/{variable_id}",
    response_model=schemas.VariableResponse,
)
def get_variable(
    variable_id: int,
    db: Session = Depends(get_db),
):
    variable = crud.get_variable(
        db,
        variable_id,
    )

    if variable is None:
        raise HTTPException(
            status_code=404,
            detail="Variable not found",
        )

    return variable

@router.put(
    "/{variable_id}",
    response_model=schemas.VariableResponse,
)
def update_variable(
    variable_id: int,
    variable: schemas.VariableUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_variable(
        db,
        variable_id,
        variable,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Variable not found",
        )

    return updated


@router.delete("/{variable_id}")
def delete_variable(
    variable_id: int,
    db: Session = Depends(get_db),
):
    deleted = crud.delete_variable(
        db,
        variable_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Variable not found",
        )

    return {
        "message": "Variable deleted successfully"
    }

