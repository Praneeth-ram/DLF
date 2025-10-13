from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from .. import database, crud, schemas
from ..auth import get_current_user

router = APIRouter()

@router.post('/', response_model=schemas.PropertyOut)
def create_property(prop: schemas.PropertyCreate, db: Session = Depends(database.get_db), user=Depends(get_current_user)):
    created = crud.create_property(db, owner_id=user.id, title=prop.title, address=prop.address, city=prop.city, state=prop.state, property_type=prop.property_type)
    return created

@router.get('/', response_model=list[schemas.PropertyOut])
def list_properties(skip: int = 0, limit: int = 50, db: Session = Depends(database.get_db), user=Depends(get_current_user)):
    return crud.get_properties(db, skip=skip, limit=limit)

@router.get('/my-properties', response_model=list[schemas.PropertyOut])
def my_properties(db: Session = Depends(database.get_db), user=Depends(get_current_user)):
    return db.query(crud.models.Property).filter(crud.models.Property.owner_id == user.id).all()

@router.get('/{property_id}', response_model=schemas.PropertyOut)
def get_property(property_id: int, db: Session = Depends(database.get_db), user=Depends(get_current_user)):
    prop = crud.get_property(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail='Property not found')
    return prop
