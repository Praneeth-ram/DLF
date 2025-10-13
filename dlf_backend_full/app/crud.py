from sqlalchemy.orm import Session
from . import models, utils
from sqlalchemy.exc import IntegrityError

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, email: str, password: str, full_name: str, role: str = 'user'):
    hashed = utils.hash_password(password)
    db_user = models.User(email=email, password_hash=hashed, full_name=full_name, role=role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_property(db: Session, owner_id: int, title: str, address: str, city: str, state: str, property_type: str='residential'):
    db_prop = models.Property(title=title, address=address, city=city, state=state, property_type=property_type, owner_id=owner_id)
    db.add(db_prop)
    db.commit()
    db.refresh(db_prop)
    return db_prop

def get_properties(db: Session, skip: int =0, limit: int =100):
    return db.query(models.Property).offset(skip).limit(limit).all()

def get_property(db: Session, property_id: int):
    return db.query(models.Property).filter(models.Property.id == property_id).first()

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
