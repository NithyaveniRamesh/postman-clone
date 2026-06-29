from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/history",
    tags=["History"],
)

@router.get(
    "/",
    response_model=list[schemas.HistoryResponse],
)
def get_history(
    db: Session = Depends(get_db),
):
    return crud.get_history(db)


@router.get(
    "/{history_id}",
    response_model=schemas.HistoryResponse,
)
def get_history_item(
    history_id: int,
    db: Session = Depends(get_db),
):
    history = crud.get_history_item(
        db,
        history_id,
    )

    if history is None:
        raise HTTPException(
            status_code=404,
            detail="History not found",
        )

    return history


@router.delete("/{history_id}")
def delete_history(
    history_id: int,
    db: Session = Depends(get_db),
):
    deleted = crud.delete_history(
        db,
        history_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="History not found",
        )

    return {
        "message": "History deleted successfully"
    }


@router.delete("/")
def clear_history(
    db: Session = Depends(get_db),
):
    return crud.clear_history(db)


