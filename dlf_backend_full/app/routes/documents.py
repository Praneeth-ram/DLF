from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, crud
from ..demo_document_service import get_demo_documents
from ..auth import get_current_user

router = APIRouter()

@router.get('/{property_id}')
def list_documents(property_id: int, user=Depends(get_current_user), db: Session = Depends(database.get_db)):
    prop = db.query(crud.models.Property).filter(crud.models.Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail='Property not found')
    docs = get_demo_documents(property_id)
    return {'property': prop.id, 'document_code': prop.document_code, 'documents': docs}

@router.get('/demo-download')
def demo_download():
    return {'message': 'This is a demo download. File content would be returned here.'}
