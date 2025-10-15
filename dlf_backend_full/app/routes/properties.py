# from fastapi import APIRouter, Depends, HTTPException, Query
# from sqlalchemy.orm import Session
# from .. import database, crud, schemas
# from ..auth import get_current_user

# router = APIRouter()

# @router.post('/', response_model=schemas.PropertyOut)
# def create_property(prop: schemas.PropertyCreate, db: Session = Depends(database.get_db), user=Depends(get_current_user)):
#     created = crud.create_property(db, owner_id=user.id, title=prop.title, address=prop.address, city=prop.city, state=prop.state, property_type=prop.property_type)
#     return created

# @router.get('/', response_model=list[schemas.PropertyOut])
# def list_properties(skip: int = 0, limit: int = 50, db: Session = Depends(database.get_db), user=Depends(get_current_user)):
#     return crud.get_properties(db, skip=skip, limit=limit)

# @router.get('/my-properties', response_model=list[schemas.PropertyOut])
# def my_properties(db: Session = Depends(database.get_db), user=Depends(get_current_user)):
#     return db.query(crud.models.Property).filter(crud.models.Property.owner_id == user.id).all()

# @router.get('/{property_id}', response_model=schemas.PropertyOut)
# def get_property(property_id: int, db: Session = Depends(database.get_db), user=Depends(get_current_user)):
#     prop = crud.get_property(db, property_id)
#     if not prop:
#         raise HTTPException(status_code=404, detail='Property not found')
#     return prop

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from ..database import get_db
from .. import crud, schemas, models

router = APIRouter(tags=["properties"])

@router.get("/", response_model=schemas.PropertyListResponse)
def get_all_properties(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=100),
    search: Optional[str] = None,
    category: Optional[str] = None,
    property_type: Optional[str] = None,
    location: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    bedrooms: Optional[int] = None,
    min_area: Optional[float] = None,
    max_area: Optional[float] = None
):
    skip = (page - 1) * limit
    
    filters = {
        'search_term': search,
        'category': category,
        'property_type': property_type,
        'location': location,
        'min_price': min_price,
        'max_price': max_price,
        'bedrooms': bedrooms,
        'min_area': min_area,
        'max_area': max_area
    }
    filters = {k: v for k, v in filters.items() if v is not None}
    
    properties, total = crud.get_properties(db, skip=skip, limit=limit, filters=filters)
    pages = (total + limit - 1) // limit
    
    # Convert SQLAlchemy objects to Pydantic PropertyOut models
    properties_out = [schemas.PropertyOut.from_orm(p) for p in properties]
    
    return schemas.PropertyListResponse(
        properties=properties_out,
        total=total,
        page=page,
        pages=pages
    )

@router.get("/{property_id}", response_model=schemas.Property)
def get_property(property_id: int, db: Session = Depends(get_db)):
    db_property = crud.get_property(db, property_id=property_id)
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    return db_property

@router.post("/", response_model=schemas.Property)
def create_property(property: schemas.PropertyCreate, db: Session = Depends(get_db)):
    return crud.create_property(db=db, property=property)

@router.put("/{property_id}", response_model=schemas.Property)
def update_property(
    property_id: int, 
    property_update: schemas.PropertyUpdate, 
    db: Session = Depends(get_db)
):
    db_property = crud.update_property(db=db, property_id=property_id, property_update=property_update)
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    return db_property

@router.delete("/{property_id}")
def delete_property(property_id: int, db: Session = Depends(get_db)):
    db_property = crud.delete_property(db=db, property_id=property_id)
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Property deleted successfully"}