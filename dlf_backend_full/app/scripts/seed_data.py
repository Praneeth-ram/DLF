from sqlalchemy.orm import Session
from faker import Faker
from app.database import SessionLocal, engine
from app import models, utils

fake = Faker()

def seed(db: Session, users_count=10, properties_per_user=2):
    models.Base.metadata.create_all(bind=engine)

    # create users
    for i in range(users_count):
        email = f'user{i+1}@example.com'
        if db.query(models.User).filter(models.User.email == email).first():
            continue
        u = models.User(email=email, password_hash=utils.hash_password('password123'), full_name=fake.name(), role='admin' if i==0 else 'user')
        db.add(u)
    db.commit()

    users = db.query(models.User).all()
    for user in users:
        for _ in range(properties_per_user):
            p = models.Property(
                title=fake.sentence(nb_words=4),
                address=fake.address(),
                city=fake.city(),
                state=fake.state(),
                property_type=fake.random_element(elements=('residential','commercial','retail')),
                owner_id=user.id
            )
            db.add(p)
    db.commit()

    # assign document codes
    props = db.query(models.Property).all()
    for prop in props:
        if not prop.document_code:
            prop.document_code = utils.generate_16_char_code()
    db.commit()

if __name__ == '__main__':
    db = SessionLocal()
    seed(db, users_count=20, properties_per_user=3)
    db.close()
    print('Seed complete.')
