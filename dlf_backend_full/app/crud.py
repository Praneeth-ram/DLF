from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models, utils ,schemas
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_, and_
from typing import Optional, Dict, Any

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, email: str, password: str, full_name: str, role: str = 'user'):
    hashed = utils.hash_password(password)
    db_user = models.User(email=email, password_hash=hashed, full_name=full_name, role=role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# def create_property(db: Session, owner_id: int, title: str, address: str, city: str, state: str, property_type: str='residential'):
#     db_prop = models.Property(title=title, address=address, city=city, state=state, property_type=property_type, owner_id=owner_id)
#     db.add(db_prop)
#     db.commit()
#     db.refresh(db_prop)
#     return db_prop

# def get_properties(db: Session, skip: int =0, limit: int =100):
#     return db.query(models.Property).offset(skip).limit(limit).all()

# def get_property(db: Session, property_id: int):
#     return db.query(models.Property).filter(models.Property.id == property_id).first()


#start of new code


def get_properties(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    filters: Optional[Dict[str, Any]] = None
):
    query = db.query(models.Property).filter(models.Property.is_active == True)
    
    if filters:
        # Search term filter
        if filters.get('search_term'):
            search = f"%{filters['search_term']}%"
            query = query.filter(
                or_(
                    models.Property.title.ilike(search),
                    models.Property.location.ilike(search),
                    models.Property.description.ilike(search),
                    models.Property.property_type.ilike(search)
                )
            )
        
        # Category filter
        if filters.get('category'):
            query = query.filter(models.Property.category == filters['category'])
        
        # Property type filter
        if filters.get('property_type'):
            query = query.filter(models.Property.property_type == filters['property_type'])
        
        # Location filter
        if filters.get('location'):
            query = query.filter(models.Property.location.ilike(f"%{filters['location']}%"))
        
        # Price range filter
        if filters.get('min_price'):
            query = query.filter(models.Property.price >= float(filters['min_price']))
        if filters.get('max_price'):
            query = query.filter(models.Property.price <= float(filters['max_price']))
        
        # Bedrooms filter (only for residential)
        if filters.get('bedrooms') and filters.get('category') == 'residential':
            query = query.filter(models.Property.bedrooms >= int(filters['bedrooms']))
        
        # Area filters
        if filters.get('min_area'):
            query = query.filter(models.Property.area >= float(filters['min_area']))
        if filters.get('max_area'):
            query = query.filter(models.Property.area <= float(filters['max_area']))
    
    total = query.count()
    properties = query.offset(skip).limit(limit).all()
    
    return properties, total

def get_property(db: Session, property_id: int):
    return db.query(models.Property).filter(models.Property.id == property_id).first()

def create_property(db: Session, property: schemas.PropertyCreate):
    property_data = property.dict()

    # If the request provides owner as a string, convert to owner_id
    owner_name = property_data.pop("owner", None)
    if owner_name:
        owner = db.query(models.User).filter(models.User.full_name == owner_name).first()
        if not owner:
            raise HTTPException(status_code=400, detail="Owner not found")
        property_data["owner_id"] = owner.id

    db_property = models.Property(**property_data)
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

def update_property(db: Session, property_id: int, property_update: schemas.PropertyUpdate):
    db_property = db.query(models.Property).filter(models.Property.id == property_id).first()
    if db_property:
        update_data = property_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_property, field, value)
        db.commit()
        db.refresh(db_property)
    return db_property

def delete_property(db: Session, property_id: int):
    db_property = db.query(models.Property).filter(models.Property.id == property_id).first()
    if db_property:
        db.delete(db_property)
        db.commit()
    return db_property

#end of new code
def assign_unique_document_code(db: Session, property_id: int):
    attempts = 0
    while attempts < 5:
        code = utils.generate_16_char_code()
        try:
            db.query(models.Property).filter(models.Property.id == property_id).update({'document_code': code})
            db.commit()
            return code
        except IntegrityError:
            db.rollback()
            attempts += 1
    raise Exception('Failed to assign unique document code after retries.')

def assign_document_code_if_missing(db: Session, property_obj):
    if property_obj.document_code:
        return None
    return assign_unique_document_code(db, property_obj.id)
