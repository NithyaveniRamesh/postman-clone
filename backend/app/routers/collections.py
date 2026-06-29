from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/collections",
    tags=["Collections"],
)


@router.post(
    "/",
    response_model=schemas.CollectionResponse,
)
def create_collection(
    collection: schemas.CollectionCreate,
    db: Session = Depends(get_db),
):
    return crud.create_collection(db, collection)


@router.get(
    "/",
    response_model=list[schemas.CollectionResponse],
)
def get_collections(
    db: Session = Depends(get_db),
):
    return crud.get_collections(db)


@router.get(
    "/{collection_id}",
    response_model=schemas.CollectionResponse,
)
def get_collection(
    collection_id: int,
    db: Session = Depends(get_db),
):
    collection = crud.get_collection(db, collection_id)

    if collection is None:
        raise HTTPException(
            status_code=404,
            detail="Collection not found",
        )

    return collection

@router.put(
    "/{collection_id}",
    response_model=schemas.CollectionResponse,
)
def update_collection(
    collection_id: int,
    collection: schemas.CollectionUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_collection(
        db,
        collection_id,
        collection,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Collection not found",
        )

    return updated


@router.delete("/{collection_id}")
def delete_collection(
    collection_id: int,
    db: Session = Depends(get_db),
):
    deleted = crud.delete_collection(
        db,
        collection_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Collection not found",
        )

    return {
        "message": "Collection deleted successfully"
    }

