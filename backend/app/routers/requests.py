from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/requests",
    tags=["Requests"],
)

@router.post(
    "/",
    response_model=schemas.RequestResponse,
)
def create_request(
    request: schemas.RequestCreate,
    db: Session = Depends(get_db),
):
    return crud.create_request(db, request)


@router.get(
    "/collection/{collection_id}",
    response_model=list[schemas.RequestResponse],
)
def get_requests(
    collection_id: int,
    db: Session = Depends(get_db),
):
    return crud.get_requests_by_collection(
        db,
        collection_id,
    )


@router.get(
    "/{request_id}",
    response_model=schemas.RequestResponse,
)
def get_request(
    request_id: int,
    db: Session = Depends(get_db),
):
    request = crud.get_request(
        db,
        request_id,
    )

    if request is None:
        raise HTTPException(
            status_code=404,
            detail="Request not found",
        )

    return request


@router.put(
    "/{request_id}",
    response_model=schemas.RequestResponse,
)
def update_request(
    request_id: int,
    request: schemas.RequestUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_request(
        db,
        request_id,
        request,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Request not found",
        )

    return updated


@router.delete("/{request_id}")
def delete_request(
    request_id: int,
    db: Session = Depends(get_db),
):
    deleted = crud.delete_request(
        db,
        request_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Request not found",
        )

    return {
        "message": "Request deleted successfully"
    }


