from app.database import SessionLocal
from app import models, utils
from sqlalchemy.exc import IntegrityError

def assign_missing(batch_size=200):
    db = SessionLocal()
    try:
        props = db.query(models.Property).filter(models.Property.document_code == None).limit(batch_size).all()
        while props:
            for prop in props:
                assigned = False
                attempts = 0
                while not assigned and attempts < 5:
                    code = utils.generate_16_char_code()
                    try:
                        prop.document_code = code
                        db.add(prop)
                        db.commit()
                        assigned = True
                    except IntegrityError:
                        db.rollback()
                        attempts += 1
                if not assigned:
                    print(f'Failed to assign for property {prop.id}')
            props = db.query(models.Property).filter(models.Property.document_code == None).limit(batch_size).all()
    finally:
        db.close()

if __name__ == '__main__':
    assign_missing()
    print('Assigned missing document_codes.')
